/*
 * @Author: liaojingping
 * @Date: 2023-02-23 11:40:30
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:00:49
 * @FilePath: \配置大屏\src\pages\report\dataSource\components\Quake.tsx
 * @Description: 微震
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import { getArea, getStrat } from '../../../../service/source'
import { IAnyObject } from '../../../../types'
import clip from '../../../../utils/clipboard'
import { Button, DatePicker, Form, InputNumber, Modal, Select } from 'antd'
import moment from 'moment'
import { FC, useRef, useState } from 'react'
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
    title: '查询全部事件',
    address: '/bigscreen/microseism/event',
    note: '推荐：滚动表格'
  },
  {
    key: 2,
    title: '事件数量图',
    address: '/bigscreen/microseism/eventCount',
    note: '推荐：柱状图/曲线图--每个地层从某个时间至今的每个小时/每天/每周/每月的事件数量走势'
  },
  {
    key: 3,
    title: '微震事件数量矩阵级分布图',
    address: '/bigscreen/microseism/eventMatrix',
    note: '推荐：曲线图--每个地层从某个时间至今的不同矩震级事件数量之和的走势'
  },
  {
    key: 4,
    title: '事件统计',
    address: '/bigscreen/microseism/eventStatistics',
    note: '推荐：饼图--每个地层从某个时间至今的事件数量'
  },
  {
    key: 5,
    title: '微震事件24小时图',
    address: '/bigscreen/microseism/eventStatistics24Hour',
    note: '推荐：雷达图--每个地层从某个时间至今的每天各个小时事件数量之和的统计'
  },
  {
    key: 6,
    title: '查询最新日分析报表分析结论',
    address: '/bigscreen/microseism/report',
    note: '推荐：单值/文本'
  },
  {
    key: 7,
    title: '查询最新日分析报表附图',
    address: '/bigscreen/microseism/reportPic',
    note: '推荐：图片'
  },
  {
    key: 8,
    title: '查询微震未处理-全部预警信息',
    address: '/bigscreen/microseism/warningInfo',
    note: '推荐：滚动表格'
  }
]

interface IFrameProps {
  userinfo: IAnyObject
}

const App: FC<IFrameProps> = (props: { userinfo: any }) => {
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataId, setDataId] = useState<number>(0)
  const [form] = Form.useForm()
  const [stratList, setStratList] = useState<any[]>([]) // 地层
  const [areaList, setAreaList] = useState<any[]>([]) // 监测工区

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

  const unitChange = (val: number) => {
    if (dataId === 1 || dataId === 8) {
      getStrat({ agencyId: val }).then((res) => {
        setStratList(
          res.map((i: { stratum_name: string; stratum_id: number }) => {
            return {
              label: i.stratum_name,
              value: i.stratum_id
            }
          })
        )
      })
    }
    if (dataId === 7) {
      getArea({ agencyId: val }).then((res) => {
        setAreaList(
          res.map((i: { area_name: string; area_id: number }) => {
            return {
              label: i.area_name,
              value: i.area_id
            }
          })
        )
      })
    }
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
              <Form.Item label='地层' name='stratumId'>
                <Select options={stratList} />
              </Form.Item>
            </>
          ) : null}

          {dataId === 2 ? (
            <>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item
                label='查询条数'
                name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='时间类型'
                name='timeType'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '小时'
                    },
                    {
                      value: 1,
                      label: '天'
                    },
                    {
                      value: 2,
                      label: '周'
                    },
                    {
                      value: 3,
                      label: '月'
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
              rules={[{ required: true, message: '此项为必填项！' }]}>
              <DatePicker style={{ width: '100%' }} showTime showNow />
            </Form.Item>
              <Form.Item
              label='查询条数'
              name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            </>
           
          ) : null}

          {dataId === 4 ? (
            <>
             <Form.Item
              label='开始时间'
              name='startTime'
              rules={[{ required: true, message: '此项为必填项！' }]}>
              <DatePicker style={{ width: '100%' }} showTime showNow />
            </Form.Item>
              <Form.Item
              label='查询条数'
              name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            </>
           
          ) : null}

          {dataId === 7 ? (
            <Form.Item label='监测工区' name='areaId'>
              <Select mode='multiple' maxTagCount={5} options={areaList} />
            </Form.Item>
          ) : null}

          {dataId === 8 ? (
            <>
              <Form.Item label='地层' name='stratumId'>
                <Select options={stratList} />
              </Form.Item>
              <Form.Item label='状态' name='status'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '未处理'
                    },
                    {
                      value: 1,
                      label: '已处理'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item label='预警等级' name='warningLevel'>
                <Select
                  options={[
                    {
                      value: 0,
                      label: '红'
                    },
                    {
                      value: 0,
                      label: '橙'
                    },
                    {
                      value: 0,
                      label: '黄'
                    },
                    {
                      value: 0,
                      label: '蓝'
                    }
                  ]}
                />
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
