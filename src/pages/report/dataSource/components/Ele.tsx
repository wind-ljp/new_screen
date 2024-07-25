/*
 * @Author: liaojingping
 * @Date: 2023-02-23 11:40:30
 * @LastEditors: huanglili 1249854467@qq.com
 * @LastEditTime: 2024-06-19 13:36:54
 * @FilePath: \BigScreenWebFE\src\pages\report\dataSource\components\Ele.tsx
 * @Description: 电法
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import { getEmsArea, getTunnel, getWorkSpace } from '../../../../service/source'
import { IAnyObject } from '../../../../types'
import clip from '../../../../utils/clipboard'
import { Button, DatePicker, Form, InputNumber, Modal, Select } from 'antd'
import moment from 'moment'
import { useRef, useState } from 'react'
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
    title: '电法报表最新结论建议',
    address: '/bigscreen/waterRisk/conclusionAndSuggestion',
    note: '推荐：单值/文本'
  },
  {
    key: 2,
    title: '电法系统状态',
    address: '/bigscreen/waterRisk/emsDevice',
    note: '推荐：滚动表格'
  },
  {
    key: 3,
    title: '电法作业数据',
    address: '/bigscreen/waterRisk/emsJobData',
    note: '推荐：滚动表格'
  },
  {
    key: 4,
    title: '电法报表信息',
    address: '/bigscreen/waterRisk/emsMonitorReport',
    note: '推荐：滚动表格'
  },
  {
    key: 5,
    title: '电法最新成果图',
    address: '/bigscreen/waterRisk/emsPic',
    note: '推荐：图片'
  },
  {
    key: 6,
    title: '电法异常分析',
    address: '/bigscreen/waterRisk/emsProAnalysis',
    note: '推荐：滚动表格'
  },
  {
    key: 7,
    title: '电法活动状态',
    address: '/bigscreen/waterRisk/emsStatus',
    note: '推荐：滚动表格'
  },
  {
    key: 8,
    title: '电法靶区数据',
    address: '/bigscreen/waterRisk/emsTargetSpotData',
    note: '推荐：曲线图'
  },
  {
    key: 9,
    title: '巷道掘进进度',
    address: '/bigscreen/waterRisk/tunnelDrilling',
    note: '推荐：曲线图'
  },
  {
    key: 10,
    title: '工作面回采进度',
    address: '/bigscreen/waterRisk/workspaceDrilling',
    note: '推荐：曲线图'
  }
]

const App = (props: { userinfo: any }) => {
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataId, setDataId] = useState<number>(0)
  const [form] = Form.useForm()
  const [areaList, setAreaList] = useState([])
  const [tunnelList, setTunnelList] = useState([])
  const [faceList, setFaceList] = useState([])

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
      if (res.startTime) {
        res.startTime = moment(res.startTime).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.endTime) {
        res.endTime = moment(res.endTime).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.workspaceIds) {
        res.workspaceIds = res.workspaceIds.join(',')
      }
      if (res.tunnelIds) {
        res.tunnelIds = res.tunnelIds.join(',')
      }
      if (res.emsAreaIds) {
        res.emsAreaIds = res.emsAreaIds.join(',')
      }
      clip(JSON.stringify(res), e.nativeEvent)
    })
  }

  const unitChange = (val: number) => {
    if (
      dataId === 1 ||
      dataId === 3 ||
      dataId === 4 ||
      dataId === 6 ||
      dataId === 7
    ) {
      getEmsArea({ agencyId: val }).then((res) => {
        setAreaList(
          res.map((i: { emsAreaName: string; emsAreaId: number }) => {
            return {
              label: i.emsAreaName,
              value: i.emsAreaId
            }
          })
        )
      })
    }
    if (dataId === 9) {
      getTunnel({ agencyId: val }).then((res) => {
        setTunnelList(
          res.map((i: { tunnelName: string; tunnelId: number }) => {
            return {
              label: i.tunnelName,
              value: i.tunnelId
            }
          })
        )
      })
    }
    if (dataId === 10) {
      getWorkSpace({ agencyId: val }).then((res) => {
        setFaceList(
          res.map((i: { workspaceName: string; workspaceId: number }) => {
            return {
              label: i.workspaceName,
              value: i.workspaceId
            }
          })
        )
      })
    }
  }

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
          <Form.Item
            label='单位'
            name='agencyId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select onChange={unitChange}>
              {props.userinfo?.systemUnitList.map(
                (i: { id: number; unitName: string }) => (
                  <Select.Option key={i.id} value={i.id}>
                    {i.unitName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
          {dataId === 1 ||
          dataId === 3 ||
          dataId === 4 ||
          dataId === 6 ||
          dataId === 7 ? (
            <>
              <Form.Item label='开始时间' name='startTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
              <Form.Item
                label='工区'
                name='emsAreaIds'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select mode='multiple' maxTagCount={5} options={areaList} />
              </Form.Item>
            </>
          ) : null}

          {dataId === 8 ? (
            <>
              <Form.Item label='开始时间' name='startTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}/>
              </Form.Item>
            </>
          ) : null}

          {dataId === 9 ? (
            <>
              <Form.Item label='开始时间' name='startTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
              <Form.Item
                label='巷道'
                name='tunnelIds'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select mode='multiple' maxTagCount={5} options={tunnelList} />
              </Form.Item>
            </>
          ) : null}

          {dataId === 10 ? (
            <>
              <Form.Item label='开始时间' name='startTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='工作面'
                name='workspaceIds'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select mode='multiple' maxTagCount={5} options={faceList} />
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
