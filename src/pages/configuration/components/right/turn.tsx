/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2024-01-17 10:33:44
 * @LastEditors: huanglili 1249854467@qq.com
 * @LastEditTime: 2024-02-01 09:55:35
 */
import { getAllScreen } from '../../../../service/three'
import { Button, InputNumber, Modal, Switch, Table, message } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const App = (props: any) => {
  const [turnTime, setTurnTime] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [handle, setHandle] = useState<boolean>(false)
  const location = useLocation()
  const urlSearch: any = new URLSearchParams(location.search)

  const sortArrayById = (array: any[], ids: string | any[]) => {
    // 将与 ids 中相同 id 的对象排序到前面
    array.sort((a, b) => {
      const indexA = ids.indexOf(a.id)
      const indexB = ids.indexOf(b.id)

      if (indexA === -1 && indexB === -1) {
        return 0
      } else if (indexA === -1) {
        return 1
      } else if (indexB === -1) {
        return -1
      }

      return indexA - indexB
    })

    return array
  }

  const openModal = () => {
    getAllScreen().then((res: any) => {
      if (res.code === 200) {
        const temp: any = [
          {
            unitName: res.data.unitName,
            bigScreenViewDTOList: res.data.bigScreenViewDTOList.map(
              (i: { screen: { id: number; title: string } }) => {
                return {
                  id: i.screen.id,
                  title: i.screen.title
                }
              }
            )
          },
          ...(res.data.bigScreenJoinVOList || [])
        ]
          .map((item) =>
            item.bigScreenViewDTOList.map(
              (j: { id: number; title: string; screen: any }) => {
                return {
                  unitName: item.unitName,
                  id: j.id || j.screen.id,
                  title: j.title || j.screen.title
                }
              }
            )
          )
          .filter((subArr) => subArr.length > 0)
          .flat()
          .filter((subItem) => subItem.id !== parseFloat(urlSearch.get('id')))
        if (props.screen.turnList) {
          const tempList: any = props.screen.turnList
          setSelectedRowKeys(JSON.parse(tempList).list)
          setTurnTime(JSON.parse(tempList).time)
          setHandle(JSON.parse(tempList).handle)
          sortArrayById(temp, JSON.parse(tempList).list) // 改变排序
        }
        setDataSource(temp)
        setIsModalOpen(true)
      } else {
        message.error(res.msg)
      }
    })
  }

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setHandle(checked)
  };
  const handleOk = () => {
    if (turnTime) {
      const temp = props.screen
      temp.turnList = JSON.stringify({
        handle:handle,
        time: turnTime,
        list: selectedRowKeys.length
          ? Array.from(
              new Set([...selectedRowKeys, parseFloat(urlSearch.get('id'))])
            )
          : []
      })
      console.log(temp.turnList);
      
      props.modifyScreen(temp)
      setTurnTime(null)
      setSelectedRowKeys([])
      setIsModalOpen(false)
    } else {
      message.error('请输入切换时间')
    }
  }

  const handleCancel = () => {
    setTurnTime(null)
    setSelectedRowKeys([])
    setIsModalOpen(false)
  }

  const columns: any = [
    {
      title: '单位',
      dataIndex: 'unitName',
      key: 'unitName',
      width: 200
    },
    {
      title: '屏幕名称',
      dataIndex: 'title',
      key: 'title',
      width: 200
    }
  ]

  return (
    <>
      <Button
        type='primary'
        onClick={openModal}
        disabled={!urlSearch.get('id')}>
        设置
      </Button>
      <Modal
        wrapClassName='modal-data'
        title={
          <>
            设置（生效条件：勾选需要轮播的屏幕 & 输入切换时间）|
            屏幕切换时间（毫秒）
            <InputNumber
              key='time'
              style={{
                width: '200px',
                marginRight: '10px'
              }}
              placeholder='请输入时间'
              value={turnTime}
              onChange={(val) => setTurnTime(val)}
            />
            是否手动
            <Switch checked={handle} style={{
                marginLeft: '10px'
              }}  key='switch' onChange={onChange} />
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
