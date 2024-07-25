/*
 * @Author: xinjp
 * @Date: 2024-06-06 09:16:55
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:57:04
 * @FilePath: \BScreenWebFE\src\pages\report\dataSource\components\AcEle.tsx
 * @Description: 随掘电法
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import { getAcEmsArea, getAcWorkSpace } from '../../../../service/source'
import { IAnyObject } from '../../../../types'
import clip from '../../../../utils/clipboard'
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import './style.scss'

interface TableItem extends IAnyObject {
  key: number
  title: string
  address: string
  note: string
}

const tableData = [
  {
    key: 1,
    title: '电法设备状态',
    address: '/bigscreen/shinDen/getDeviceInfo',
    note: '推荐：滚动表格'
  },
  {
    key: 2,
    title: '电法报表信息',
    address: '/bigscreen/shinDen/reportDoc',
    note: '推荐：滚动表格'
  },
  {
    key: 3,
    title: '电法最新成果图',
    address: '/bigscreen/shinDen/getReportPage',
    note: '推荐：图片'
  },
  {
    key: 4,
    title: '巷道掘进进度',
    address: '/bigscreen/shinDen/tunnelDriving',
    note: '推荐：曲线图'
  },
  {
    key: 5,
    title: '工作面回采进度',
    address: '/bigscreen/shinDen/workspaceDrilling',
    note: '推荐：曲线图'
  }
]

const App = (props: { userinfo: any }) => {
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataId, setDataId] = useState<number>(0)
  const [form] = Form.useForm()
  const [areaList, setAreaList] = useState([])
  const [workspaceList, setWorkspaceList] = useState([])

  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: '数据来源',
      dataIndex: 'title'
    },
    {
      title: '接口地址',
      dataIndex: 'address'
    },
    {
      title: '描述',
      dataIndex: 'note'
    },
    {
      title: '操作',
      search: false,
      width: 275,
      render(dom, record: any, index, action, schema) {
        return (
          <div className='app-table__operation'>
            <span
              onClick={() => {
                setDataId(record.key)
                setIsModalOpen(true)
              }}
              className='link'>
              设置请求参数
            </span>
            <span onClick={(e) => clip(record.address, e)} className='link'>
              复制接口地址
            </span>
          </div>
        )
      }
    }
  ]

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = (e: any) => {
    form.validateFields().then((res) => {
      if (res.installStartDate) {
        res.installStartDate = moment(res.installStartDate).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.installEndDate) {
        res.installEndDate = moment(res.installEndDate).format('YYYY-MM-DD HH:mm:ss')
      }
      // if (res.workspaceIds) {
      //   res.workspaceIds = res.workspaceIds.join(',')
      // }
      // if (res.areaIds) {
      //   res.areaIds = res.areaIds.join(',')
      // }
      // if (res.drivingTypes) {
      //   res.drivingTypes = res.drivingTypes.join(',')
      // }
      clip(JSON.stringify(res), e.nativeEvent)
    })
  }

  useEffect(() => {
    getAcEmsArea().then((res: any) => {
      setAreaList(
        res.data.map((i: { areaName: string; areaId: number }) => {
          return {
            label: i.areaName,
            value: i.areaId
          }
        })
      )
      console.log(areaList);
    })
    getAcWorkSpace().then((res: any) => {
      setWorkspaceList(
        res.data.map((i: { workspaceName: string; workspaceId: number }) => {
          return {
            label: i.workspaceName,
            value: i.workspaceId
          }
        })
      )
    })
  }, [])
  
  return (
    <>
      <Modal
        wrapClassName="paramModal"
        title='设置请求参数'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}>
        <Form form={form}>
        {dataId === 1 ? (
            <>
              <Form.Item
                label='工区'
                name='areaId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={5}
                  options={areaList}
                />
              </Form.Item>
              <Form.Item label='安装开始时间' name='installStartDate'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='安装结束时间' name='installEndDate'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
            </>
          ) : null}

          {dataId === 2 ? (
            <>
              <Form.Item label='距今时间(时)' name='recentTime'>
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='maxCount' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
            </>
          ) : null}

          {dataId === 4 ? (
            <>
              <Form.Item
                label='掘进类型'
                name='drivingType'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={2}
                  allowClear
                  options={[
                    {
                      value: 0,
                      label: '盾构掘进'
                    },
                    {
                      value: 1,
                      label: '综掘掘进'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='距今时间(时)' name='recentTime'>
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='maxCount' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
            </>
          ) : null}

          {dataId === 5 ? (
            <>
              <Form.Item
                label='工作面'
                name='workspaceId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={5}
                  options={workspaceList}
                />
              </Form.Item>
              <Form.Item label='距今时间(时)' name='recentTime'>
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='maxCount' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
            </>
          ) : null}

          <Form.Item>
            <Button type='primary' onClick={(e) => onFinish(e)}>
              复制请求参数
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ProTable<TableItem>
        options={{ reload: false, density: false, setting: false }}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        search={false}
        request={async (params = {}, sort, filter) => {
          return {
            data: tableData
          }
        }}
        tableAlertRender={false}
        pagination={false}></ProTable>
    </>
  )
}

export default App
