/*
 * @Author: liaojingping
 * @Date: 2023-02-24 08:55:05
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:01:04
 * @FilePath: \配置大屏\src\pages\report\dataSource\components\Water.tsx
 * @Description: 水质
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */

import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import { getPoints, getWaterSource } from '../../../../service/source'
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
    title: '查询已完成检验的水样列表',
    address: '/bigscreen/waterPro/analysisWaterTable',
    note: '推荐：滚动表格'
  },
  {
    key: 2,
    title: '查询取样点',
    address: '/bigscreen/waterPro/pointTable',
    note: '推荐：滚动表格'
  },
  {
    key: 3,
    title: '查询某个取样点下各离子指标的变化情况',
    address: '/bigscreen/waterPro/pointWater',
    note: '推荐：曲线图'
  },
  {
    key: 4,
    title: '多个水样各检测指标的数值对比',
    address: '/bigscreen/waterPro/waterSampleList',
    note: '推荐：柱状图'
  },
  {
    key: 5,
    title: '查询水样列表',
    address: '/bigscreen/waterPro/waterTable',
    note: '推荐：滚动表格'
  }
]

const App = (props: { userinfo: any }) => {
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataId, setDataId] = useState<number>(0)
  const [form] = Form.useForm()
  const [pointList, setPointList] = useState([])
  const [waterSourceList, setWaterSourceList] = useState([])

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
      clip(JSON.stringify(res), e.nativeEvent)
    })
  }

  const unitChange = (val: number) => {
    if (dataId === 1 || dataId === 3 || dataId === 4 || dataId === 5) {
      getPoints({ agencyId: val }).then((res: any) =>
        setPointList(
          res.map((i: { point_name: string; point_id: number }) => {
            return {
              label: i.point_name,
              value: i.point_id
            }
          })
        )
      )
      getWaterSource({ agencyId: val }).then((res: any) =>
        setWaterSourceList(
          res.map((i: { source_name: string; source_id: number }) => {
            return {
              label: i.source_name,
              value: i.source_id
            }
          })
        )
      )
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
          {dataId === 1 ? (
            <>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='结束时间'
                name='endTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='水样状态' name='sampleStatus'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '等待送样'
                    },
                    {
                      value: 1,
                      label: '正在送样'
                    },
                    {
                      value: 2,
                      label: '等待检验'
                    },
                    {
                      value: 3,
                      label: '完成检验'
                    },
                    {
                      value: 4,
                      label: '废样'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='水样类型' name='sampleType'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '常规水样'
                    },
                    {
                      value: 1,
                      label: '标准水样'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='水源类型' name='sourceId'>
                <Select options={waterSourceList} />
              </Form.Item>
              <Form.Item label='取样点' name='pointId'>
                <Select options={pointList} />
              </Form.Item>
            </>
          ) : null}
          {dataId === 2 ? (
            <>
              <Form.Item label='取样点类型' name='pointType'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '临时采样点'
                    },
                    {
                      value: 1,
                      label: '长期采样点'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='水样状态' name='sampleStatus'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '等待送样'
                    },
                    {
                      value: 1,
                      label: '正在送样'
                    },
                    {
                      value: 2,
                      label: '等待检验'
                    },
                    {
                      value: 3,
                      label: '完成检验'
                    },
                    {
                      value: 4,
                      label: '废样'
                    }
                  ]}
                />
              </Form.Item>
            </>
          ) : null}
          {dataId === 3 ? (
            <>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！!' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='取样点'
                name='pointId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select options={pointList} />
              </Form.Item>
            </>
          ) : null}
          {dataId === 4 ? (
            <Form.Item
              label='水源类型'
              name='ids'
              rules={[{ required: true, message: '此项为必填项！' }]}>
              <Select mode='multiple' maxTagCount={5} options={waterSourceList} />
            </Form.Item>
          ) : null}
          {dataId === 5 ? (
            <>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='结束时间'
                name='endTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='水样状态' name='sampleStatus'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '等待送样'
                    },
                    {
                      value: 1,
                      label: '正在送样'
                    },
                    {
                      value: 2,
                      label: '等待检验'
                    },
                    {
                      value: 3,
                      label: '完成检验'
                    },
                    {
                      value: 4,
                      label: '废样'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='水样类型' name='sampleType'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '常规水样'
                    },
                    {
                      value: 1,
                      label: '标准水样'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='水源类型' name='sourceId'>
                <Select options={waterSourceList} />
              </Form.Item>
              <Form.Item label='取样点' name='pointId'>
                <Select options={pointList} />
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
