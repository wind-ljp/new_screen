/*
 * @Description: 地图矿井区域设置
 * @Author: liaojingping
 * @Date: 2024-02-01 14:21:35
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:28:16
 */
import { getAllScreen } from '../../../../service/three'
import { IScreen } from '../../../../store/actionType'
import { Button, Modal, Table, message, Upload, InputNumber } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx'

const App = (props: { screen: IScreen; modifyScreen: (arg0: any) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [selectedRowValues, setSelectedRowValues] = useState<any[]>([])
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)

  const openModal = () => {
    getAllScreen().then((res: any) => {
      if (res.code === 200) {
        const temp = [
          {
            unitName: res.data.unitName,
            bigScreenViewDTOList: res.data.bigScreenViewDTOList.map(
              (i: {
                screen: { id: number; title: string; agencyId: number }
              }) => {
                return {
                  id: i.screen.id,
                  title: i.screen.title,
                  agencyId: i.screen.agencyId
                }
              }
            )
          },
          ...(res.data.bigScreenJoinVOList || [])
        ]
          .map((item) =>
            item.bigScreenViewDTOList.map(
              (j: {
                id: number
                title: string
                screen: IScreen
                agencyId: number
              }) => {
                return {
                  unitName: item.unitName,
                  id: j.id || j.screen.id,
                  title: j.title || j.screen.title,
                  agencyId: j.agencyId || j.screen.agencyId
                }
              }
            )
          )
          .filter((subArr) => subArr.length > 0)
          .flat()
          .filter(
            (subItem) =>
              subItem.id !== parseFloat(urlSearch.get('id') as string)
          )
        if (props.screen.setMapArea) {
          const tempAxisList: any = props.screen.setMapArea
          setSelectedRowKeys(
            JSON.parse(tempAxisList).map((i: { id: number }) => i.id)
          )
          setSelectedRowValues(JSON.parse(tempAxisList))
          const mergedArray = JSON.parse(tempAxisList).concat(temp)
          const distinctArray = mergedArray.reduce(
            (result: any[], obj: { id: any }) => {
              if (!result.some((item) => item.id === obj.id)) {
                result.push(obj)
              }
              return result
            },
            []
          )
          setDataSource(distinctArray)
        } else {
          setDataSource(temp)
        }
        setIsModalOpen(true)
      } else {
        message.error(res.msg)
      }
    })
  }

  const onSelectChange = (keys: any[], selectedRows: any[]) => {
    setSelectedRowKeys(keys)
    setSelectedRowValues(selectedRows)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const handleCancel = () => {
    setSelectedRowKeys([])
    setSelectedRowValues([])
    setIsModalOpen(false)
  }

  const handleOk = () => {
    if (selectedRowKeys.length) {
      selectedRowValues.forEach((item, index) => {
        if (!item.coordList) {
          message.warning(`选中行第${index + 1}行未上传坐标集合`)
        } else {
          const temp = props.screen
          temp.setMapArea = JSON.stringify(selectedRowValues)
          props.modifyScreen(temp)
          handleCancel()
        }
      })
    } else {
      message.warning('至少选中一行数据')
    }
  }

  const columns: any = [
    {
      title: '单位名称',
      dataIndex: 'unitName',
      key: 'unitName'
    },
    {
      title: '单位ID',
      dataIndex: 'agencyId',
      width: 200
    },
    {
      title: '屏幕名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '坐标集',
      dataIndex: 'coordList',
      key: 'coordList',
      render: (_: any, record: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <Upload
              maxCount={1}
              accept='xls, .xlsx'
              beforeUpload={(files) => {
                const reader = new FileReader()
                reader.onload = (e: any) => {
                  const data = new Uint8Array(e.target.result)
                  const workbook = XLSX.read(data, { type: 'array' })
                  const sheetName = workbook.SheetNames[0]
                  const worksheet = workbook.Sheets[sheetName]
                  const excelData: any = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1
                  })
                  if (
                    !excelData.length ||
                    excelData[0][0] !== 'x' ||
                    excelData[0][1] !== 'y'
                  ) {
                    message.error('模板错误')
                    return false
                  }
                  excelData.shift()
                  if (excelData.length) {
                    record.coordList = excelData.filter(
                      (sub: any) => sub.length
                    )
                  } else {
                    message.error('坐标集合为空')
                  }
                }
                reader.readAsArrayBuffer(files)
                return false
              }}
              onRemove={() => {
                record.coordList = null
              }}>
              <Button type='primary'>导入</Button>
            </Upload>
            <Button
              disabled={!record?.coordList?.length}
              style={{ marginLeft: '10px' }}
              type='primary'
              onClick={() => {
                const temp = record.coordList || []
                temp.unshift(['x', 'y'])
                const worksheet = XLSX.utils.aoa_to_sheet(temp)
                const columnWidth = { wch: 20 }
                worksheet['!cols'] = [{ width: columnWidth.wch, hidden: false }]
                worksheet['!cols'][0] = columnWidth
                worksheet['!cols'][1] = columnWidth
                const workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
                const excelBuffer = XLSX.write(workbook, {
                  bookType: 'xlsx',
                  type: 'array'
                })
                const dataBlob = new Blob([excelBuffer], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                })
                const fileName = `${record.unitName}区域坐标集.xlsx`
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement('a')
                link.href = url
                link.download = fileName
                link.click()
                setTimeout(() => {
                  URL.revokeObjectURL(url)
                }, 100)
              }}>
              导出
            </Button>
          </div>
        )
      }
    },
    {
      title: '字号(px)',
      dataIndex: 'fontSize',
      key: 'fontSize',
      render: (_: any, record: any) => {
        return (
          <InputNumber
            min={1}
            onChange={(val) => {
              record.fontSize = val
              const temp: any = selectedRowValues
              temp.forEach((item: { id: number; fontSize: number }) => {
                if (item.id === record.id) {
                  item.fontSize = val
                }
              })
            }}
            defaultValue={record.fontSize ?? null}
          />
        )
      }
    }
  ]

  return (
    <>
      <Button type='primary' onClick={openModal}>
        设置
      </Button>
      <Modal
        wrapClassName='modal-data'
        title={
          <>
            <span style={{ marginRight: '10px' }}>
              生效条件：选中并导入坐标集
            </span>
            <a
              href='/矿井区域坐标集合模板.xlsx'
              download='/矿井区域坐标集合模板.xlsx'>
              点击下载模板
            </a>
          </>
        }
        onCancel={handleCancel}
        onOk={handleOk}
        closable={false}
        open={isModalOpen}
        maskClosable={false}
        width='80%'>
        <div className='container'>
          <Table
            size='small'
            rowKey={(record: { id: number }) => record.id}
            dataSource={dataSource}
            columns={columns}
            rowClassName='model-row'
            pagination={false}
            rowSelection={rowSelection}
          />
        </div>
      </Modal>
    </>
  )
}

export default App
