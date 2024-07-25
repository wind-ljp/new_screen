/*
 * @Author: liaojingping
 * @Date: 2023-02-23 11:40:30
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:59:10
 * @FilePath: \配置大屏\src\pages\report\dataSource\components\KJ418.tsx
 * @Description: 418
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import { getHydroGroup, getHydroPoint, getHydroType } from '../../../../service/source'
import { IAnyObject } from '../../../../types'
import clip from '../../../../utils/clipboard'
import type { RadioChangeEvent } from 'antd'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  message
} from 'antd'
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
    title: '某一时间至今预警信息',
    address: '/bigscreen/kj418/alarmInfo',
    note: '推荐：滚动表格'
  },
  {
    key: 2,
    title: '年内每月预警数',
    address: '/bigscreen/kj418/alarmMouth',
    note: '推荐：堆积柱状图'
  },
  {
    key: 3,
    title: '查询某个时间至今的报表信息',
    address: '/bigscreen/kj418/getReportInfoTable',
    note: '推荐：滚动表格'
  },
  {
    key: 4,
    title: '时间段内的历史数据',
    address: '/bigscreen/kj418/historicalData',
    note: '推荐：曲线图--此接口时间跨度较大时耗时会很长'
  },
  {
    key: 5,
    title: '查询历史设备状态',
    address: '/bigscreen/kj418/historicalDeviceStatusTable',
    note: '推荐：滚动表格'
  },
  {
    key: 6,
    title: '各水源类型测点数统计',
    address: '/bigscreen/kj418/hydroTypeCount',
    note: '推荐：饼图'
  },
  {
    key: 7,
    title: '查询最新数据',
    address: '/bigscreen/kj418/latestDataTable',
    note: '推荐：滚动表格'
  },
  {
    key: 8,
    title: '查询设备最新状态',
    address: '/bigscreen/kj418/latestDeviceStatusTable',
    note: '推荐：滚动表格'
  },
  {
    key: 9,
    title: '各监测类型测点数统计',
    address: '/bigscreen/kj418/monitorTypeCount',
    note: '推荐：饼图'
  },
  {
    key: 10,
    title: '统计数据',
    address: '/bigscreen/kj418/statisticalData',
    note: '推荐：曲线图'
  },
  {
    key: 11,
    title: '查询最新数据',
    address: ' /bigscreen/kj418/latestDataLine',
    note: '推荐：柱状图'
  },
  {
    key: 12,
    title: '设备总数',
    address: '/bigscreen/kj418/getDeviceCount',
    note: '推荐：字符串'
  },
  {
    key: 13,
    title: '正常设备数',
    address: '/bigscreen/kj418/getDeviceOnline',
    note: '推荐：字符串'
  },
  {
    key: 14,
    title: '离线设备数',
    address: '/bigscreen/kj418/getDeviceUnOnline',
    note: '推荐：字符串'
  },
  {
    key: 15,
    title: '统计数据(多矿)',
    address: '/bigscreen/kj418/statisticalDataAgency',
    note: '推荐：曲线图'
  },
  {
    key: 16,
    title: '时间段内的历史数据(多矿)',
    address: '/bigscreen/kj418/historicalDataAgency',
    note: '推荐：曲线图--此接口时间跨度较大时耗时会很长'
  },
  {
    key: 17,
    title: '设备总数(多矿)',
    address: '/bigscreen/kj418/getDeviceCountAgency',
    note: '推荐：字符串'
  },
  {
    key: 18,
    title: '正常设备数(多矿)',
    address: '/bigscreen/kj418/getDeviceOnlineAgency',
    note: '推荐：字符串'
  },
  {
    key: 19,
    title: '离线设备数(多矿)',
    address: '/bigscreen/kj418/getDeviceUnOnlineAgency',
    note: '推荐：字符串'
  },
  {
    key: 20,
    title: '某一时间至今预警信息(多矿)',
    address: '/bigscreen/kj418/alarmInfoAgency',
    note: '推荐：滚动表格'
  },
  {
    key: 21,
    title: '待处理预警数',
    address: '/bigscreen/kj418/pendingAlarmCount',
    note: '推荐：字符串'
  }
]

const App = (props: { userinfo: any }) => {
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataId, setDataId] = useState<number>(0)
  const [form] = Form.useForm()
  const [monitorType, setMonitorType] = useState<any[]>([]) // 监测类型
  const [monitorPoint, setMonitorPoint] = useState<any[]>([]) // 测点
  const [hydroGroup, setHydroGroup] = useState<any[]>([]) // 流量组
  const [values, setValues] = useState<any>('')
  const [values2, setValues2] = useState<any>([])
  const [conditionList, setConditionList] = useState<any[]>([
    {
      id: Date.now(),
      agencyId: '',
      pointId: '',
      groupId: ''
    }
  ]);
  const [monitorPoint2, setMonitorPoint2] = useState<any[]>([]) // 测点
  const [hydroGroup2, setHydroGroup2] = useState<any[]>([]) // 流量组
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
    setConditionList([
      {
        id: Date.now(),
        agencyId: '',
        pointId: '',
        groupId: ''
      }
    ])
  }
  const onFinish = (e: any) => {
    form.validateFields().then((res) => {
      console.log(res)
     if (res.agencyIds) {
      res.agencyIds = res.agencyIds.toString()
     }
      if (res.startTime) {
        res.startTime = moment(res.startTime).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.endTime) {
        res.endTime = moment(res.endTime).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.year) {
        res.year = moment(res.year).format('YYYY')
      }
      if (res.monitorBody) {
        delete res.monitorBody
      }
      
      if (dataId==15) {
        if (conditionList.length!==0) {
          const conditions: {
            agencyId: any;
            pointId: any;
            groupId: any;
          }[] = [];
          let obj: any= {};
          conditionList.forEach((item: any, i: number) => {
            if (res['monitorBody' + i]==1) {
               obj = {
                agencyId: res['agencyId' + i],
                pointId: res['pointId' + i]
              };
              
            conditions.push(obj);
            } else {
               obj = {
                agencyId: res['agencyId' + i],
                groupId: res['groupId' + i]
              };
              
            conditions.push(obj);
            }
            res.agencyAndPointGroups = conditions
            delete res['agencyId' + i];
            delete res['pointId' + i];
            delete res['groupId' + i]
          });
          clip(JSON.stringify(res), e.nativeEvent)
        } else {
          message.warn('至少新增一个单位')
        }
      
      } else if (dataId==16) {
        if (conditionList.length!==0) {
          const conditions: {
            agencyId: any;
            pointId: any;
          }[] = [];
          let obj: any= {};
          conditionList.forEach((item: any, i: number) => {
               obj = {
                agencyId: res['agencyId' + i],
                groupId: res['pointId' + i]
              };
              
            conditions.push(obj);
            
            res.agencyAndPointIds = conditions
            delete res['agencyId' + i];
            delete res['pointId' + i];
          });
          clip(JSON.stringify(res), e.nativeEvent)
        } else {
          message.warn('至少新增一个单位')
        }
      } else {
         clip(JSON.stringify(res), e.nativeEvent)
      }
     
    })
  }

  useEffect(() => {
    setMonitorPoint2([...monitorPoint2, []]);
    // 水文监测类型
    getHydroType().then((res: any) => {
      setMonitorType(
        res.map((i: { monitor_type_name: string; monitor_type_id: number }) => {
          return {
            label: i.monitor_type_name,
            value: i.monitor_type_id
          }
        })
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 // 增加条件
 const addCondition = () => {
  const arr = {
    id: Date.now(),
    agencyId: '',
    pointId: '',
    groupId: ''
  };
  setMonitorPoint2([...monitorPoint2, []]);
  setHydroGroup2([...hydroGroup2, []]);
  setConditionList([...conditionList, arr]);
};
// 移除条件
const removeCondition = (id: any, index: number) => {
  const conditions: {
    agencyId: any;
    pointId: any;
    groupId: any;
  }[] = [];
  conditionList.forEach((item: any, i: number) => {
    const obj = {
      agencyId: form.getFieldsValue()['agencyId' + i],
      pointId: form.getFieldsValue()['pointId' + i],
      groupId: form.getFieldsValue()['groupId' + i]
    };

    conditions.push(obj);
  });
  conditions.splice(index, 1);

  const postList = [...conditionList];
  postList.splice(index, 1);
  setConditionList(postList);
};
  const unitChange = (val: number) => {
    if (dataId === 4 || dataId === 7 || dataId === 10) {
      getHydroPoint({ agencyId: val }).then((res) => {
        setMonitorPoint(
          res.map((i: { point_name: string; point_id: number }) => {
            return {
              label: i.point_name,
              value: i.point_id
            }
          })
        )
      })
      if (dataId === 10) {
        getHydroGroup({ agencyId: val }).then((res) => {
          setHydroGroup(
            res.map((i: { group_name: string; group_id: number }) => {
              return {
                label: i.group_name,
                value: i.group_id
              }
            })
          )
        })
      }
    }
  }

  const [value, setValue] = useState()

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
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
        {dataId !== 15&&dataId!==16&&dataId!==17&&dataId!==18&&dataId!==19&&dataId!==20 ? (
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
        ):('')}
         
          {dataId === 1 ? (
            <>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='查询条数' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]} name='limit' >
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
              <Form.Item label='警报状态' name='alarmStatus'>
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
            </>
          ) : null}
          {dataId === 2 ? (
            <Form.Item
              label='年份'
              name='year'
              rules={[{ required: true, message: '此项为必填项！' }]}>
              <DatePicker picker='year' style={{ width: '100%' }} />
            </Form.Item>
          ) : null}
          {dataId === 3 ? (
            <>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='查询条数' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]} name='limit'>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='报表类型'
                name='reportTypes'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={5}
                  allowClear
                  options={[
                    {
                      value: 0,
                      label: '历史数据报表'
                    },
                    {
                      value: 1,
                      label: '统计数据报表'
                    },
                    {
                      value: 2,
                      label: '日分析报表'
                    },
                    {
                      value: 3,
                      label: '周分析报表'
                    },
                    {
                      value: 4,
                      label: '月分析报表'
                    }
                  ]}
                />
              </Form.Item>
            </>
          ) : null}
          {dataId === 4 ? (
            <>
              {/* <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item> */}
               <Form.Item label='距今时间(时)' name='recentTime'>
                        <Input style={{ width: '100%' }} />
                        </Form.Item>
              <Form.Item label='查询条数' name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='监测类型'
                name='monitorTypeId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select options={monitorType} />
              </Form.Item>
              <Form.Item
                label='测点'
                name='pointId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={5}
                  options={monitorPoint}
                />
              </Form.Item>
            </>
          ) : null}
          {dataId === 5 ? (
            <>
              <Form.Item label='开始时间' name='startTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='查询条数' name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }}  />
              </Form.Item>
            </>
          ) : null}
          {dataId === 7 ? (
            <>
              <Form.Item
                label='监测类型'
                name='monitorTypeId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select mode='multiple' maxTagCount={5} options={monitorType} />
              </Form.Item>
              <Form.Item
                label='测点'
                name='pointId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={5}
                  options={monitorPoint}
                />
              </Form.Item>
            </>
          ) : null}
          {dataId === 8 ? (
            <Form.Item label='开始时间' name='startTime'>
              <DatePicker style={{ width: '100%' }} showTime showNow />
            </Form.Item>
          ) : null}
          {dataId === 10 ? (
            <>
              {/* <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item> */}
               <Form.Item label='距今时间(时)' name='recentTime'>
                        <Input style={{ width: '100%' }} />
                        </Form.Item>
              <Form.Item label='查询条数' name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='监测类型' name='monitorTypeId'>
                <Select options={monitorType} />
              </Form.Item>
              <Form.Item label='时间类型' name='timeType'>
                <Select
                  maxTagCount={5}
                  allowClear
                  options={[
                    {
                      value: 1,
                      label: '时'
                    },
                    {
                      value: 2,
                      label: '日'
                    },
                    {
                      value: 3,
                      label: '周'
                    },
                    {
                      value: 4,
                      label: '月'
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item name='monitorBody'>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>测点</Radio>
                  <Radio value={2}>流量组</Radio>
                </Radio.Group>
              </Form.Item>
              {value === 1 ? (
                <Form.Item label='测点' name='pointId'>
                  <Select options={monitorPoint} />
                </Form.Item>
              ) : null}
              {value === 2 ? (
                <Form.Item label='流量组' name='groupId'>
                  <Select options={hydroGroup} />
                </Form.Item>
              ) : null}
            </>
          ) : null}
          {dataId === 11 ? (
            <>
              <Form.Item
                label='监测类型'
                name='monitorTypeId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select mode='multiple' options={monitorType} />
              </Form.Item>
              <Form.Item
                label='测点'
                name='pointId'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select
                  mode='multiple'
                  maxTagCount={5}
                  options={monitorPoint}
                />
              </Form.Item>
            </>
          ) : null}
            {dataId === 15 ? (
          <>
           <Button onClick={addCondition} type="primary" >
                增加单位
              </Button>
           {conditionList.map((item, index) => {
            return (
              <>
              <div style={{border:'1px #000 solid',padding:'10px',margin:'8px 0'}}>
                   <Form.Item
           label='单位'
           name={'agencyId' + index}
           rules={[{ required: true, message: '此项为必填项！' }]}>
           <Select onChange={(val)=>{
             getHydroPoint({ agencyId: val }).then((res) => {
              const temp_monitorPoint = monitorPoint2;
              temp_monitorPoint.splice(index, 1, res);
              setMonitorPoint2(JSON.parse(JSON.stringify(temp_monitorPoint)))
            })
            getHydroGroup({ agencyId: val }).then((res) => {
              const temp_hydroGroup = hydroGroup2;
              temp_hydroGroup.splice(index, 1, res);
              setHydroGroup2(JSON.parse(JSON.stringify(temp_hydroGroup)))
            })
            form.setFieldValue('pointId' + index, undefined);
            form.setFieldValue('groupId' + index, undefined);
           }}>
             {props.userinfo?.systemUnitList.map(
               (i: { id: number; unitName: string }) => (
                 <Select.Option key={i.id} value={i.id}>
                   {i.unitName}
                 </Select.Option>
               )
             )}
           </Select>
         </Form.Item>
         <Form.Item name={'monitorBody'+index}>
                <Radio.Group onChange={(e: RadioChangeEvent)=>{
                    setMonitorPoint2([...monitorPoint2, []]);
                    setHydroGroup2([...hydroGroup2, []]);
                  const temp_value = values2;
                  temp_value.splice(index, 1, e.target.value);
                  setValues2(JSON.parse(JSON.stringify(temp_value)))
                }} value={value}>
                  <Radio value={1}>测点</Radio>
                  <Radio value={2}>流量组</Radio>
                </Radio.Group>
              </Form.Item>
         {values2[index] === 1 ? (
                <Form.Item label='测点' name={'pointId' + index}>
                  <Select  mode='multiple'>
                        {monitorPoint2[index].map((i: any) => (
                          <Select.Option key={i.point_id} value={i.point_id}>
                            {i.point_name}
                          </Select.Option>
                        ))}
                      </Select>
                </Form.Item>
              ) : null}
              {values2[index] === 2 ? (
                <Form.Item label='流量组' name={'groupId' + index}>
                  <Select  mode='multiple'>
                        {hydroGroup2[index].map((i: any) => (
                          <Select.Option key={i.group_id} value={i.group_id}>
                            {i.group_name}
                          </Select.Option>
                        ))}
                      </Select>
                </Form.Item>
              ) : null}
                    <Button
                      type="primary"
                      onClick={() => removeCondition(item.id, index)}
                    >
                      移除单位
                    </Button>
              </div>
            
              </>
            );
          })}

                    {/* <Form.Item
                      label='开始时间'
                      name='startTime'
                      rules={[{ required: true, message: '此项为必填项！' }]}>
                      <DatePicker style={{ width: '100%' }} showTime showNow />
                    </Form.Item> */}
                     <Form.Item label='距今时间(时)' name='recentTime'>
                        <Input style={{ width: '100%' }} />
                        </Form.Item>
                    <Form.Item label='查询条数' name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label='监测类型' name='monitorTypeId'>
                      <Select options={monitorType} />
                    </Form.Item>
                    <Form.Item label='查询类型' name='queryType'>
                      <Select
                        options={[
                          {
                            value: 0,
                            label: '最大值'
                          },
                          {
                            value: 1,
                            label: '最小值'
                          },
                          {
                            value:2,
                            label: '平均值'
                          },
                          {
                            value: 3,
                            label: '变化量'
                          }
                        ]}
                      />
              </Form.Item>
              <Form.Item label='时间类型' name='timeType'>
                <Select
                  maxTagCount={5}
                  allowClear
                  options={[
                    {
                      value: 1,
                      label: '时'
                    },
                    {
                      value: 2,
                      label: '日'
                    },
                    {
                      value: 3,
                      label: '周'
                    },
                    {
                      value: 4,
                      label: '月'
                    }
                  ]}
                />
              </Form.Item>
             
              
            </>
          ) : null}
          {dataId === 16 ? (
                      <>
                      <Button onClick={addCondition} type="primary" >
                增加单位
              </Button>
           {conditionList.map((item, index) => {
            return (
              <>
              <div style={{border:'1px #000 solid',padding:'10px',margin:'8px 0'}}>
                   <Form.Item
           label='单位'
           name={'agencyId' + index}
           rules={[{ required: true, message: '此项为必填项！' }]}>
           <Select onChange={(val)=>{
             getHydroPoint({ agencyId: val }).then((res) => {
              const temp_monitorPoint = monitorPoint2;
              temp_monitorPoint.splice(index, 1, res);
              setMonitorPoint2(JSON.parse(JSON.stringify(temp_monitorPoint)))
            })
            form.setFieldValue('pointId' + index, undefined);
           }}>
             {props.userinfo?.systemUnitList.map(
               (i: { id: number; unitName: string }) => (
                 <Select.Option key={i.id} value={i.id}>
                   {i.unitName}
                 </Select.Option>
               )
             )}
           </Select>
         </Form.Item>
                <Form.Item label='测点' name={'pointId' + index}>
                  <Select  mode='multiple'>
                        {monitorPoint2[index].map((i: any) => (
                          <Select.Option key={i.point_id} value={i.point_id}>
                            {i.point_name}
                          </Select.Option>
                        ))}
                      </Select>
                </Form.Item>
             
                    <Button
                      type="primary"
                      onClick={() => removeCondition(item.id, index)}
                    >
                      移除单位
                    </Button>
              </div>
            
              </>
            );
          })}
                        {/* <Form.Item
                          label='开始时间'
                          name='startTime'
                          rules={[{ required: true, message: '此项为必填项！' }]}>
                          <DatePicker style={{ width: '100%' }} showTime showNow />
                        </Form.Item> */}
                        <Form.Item label='距今时间(时)' name='recentTime'>
                        <Input style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label='查询条数' name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                          <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          label='监测类型'
                          name='monitorTypeId'
                          rules={[{ required: true, message: '此项为必填项！' }]}>
                          <Select options={monitorType} />
                        </Form.Item>
                      </>
                    ) : null}
          
          {dataId ===17? (
           <Form.Item
           label='单位'
           name='agencyIds'
           rules={[{ required: true, message: '此项为必填项！' }]}>
           <Select mode='multiple' onChange={unitChange}>
             {props.userinfo?.systemUnitList.map(
               (i: { id: number; unitName: string }) => (
                 <Select.Option key={i.id} value={i.id}>
                   {i.unitName}
                 </Select.Option>
               )
             )}
           </Select>
         </Form.Item>
        ):('')}
          {dataId ===18? (
           <Form.Item
           label='单位'
           name='agencyIds'
           rules={[{ required: true, message: '此项为必填项！' }]}>
           <Select mode='multiple' onChange={unitChange}>
             {props.userinfo?.systemUnitList.map(
               (i: { id: number; unitName: string }) => (
                 <Select.Option key={i.id} value={i.id}>
                   {i.unitName}
                 </Select.Option>
               )
             )}
           </Select>
         </Form.Item>
        ):('')}
          {dataId ===19? (
           <Form.Item
           label='单位'
           name='agencyIds'
           rules={[{ required: true, message: '此项为必填项！' }]}>
           <Select mode='multiple' onChange={unitChange}>
             {props.userinfo?.systemUnitList.map(
               (i: { id: number; unitName: string }) => (
                 <Select.Option key={i.id} value={i.id}>
                   {i.unitName}
                 </Select.Option>
               )
             )}
           </Select>
         </Form.Item>
        ):('')}

{dataId === 20 ? (
            <>
             <Form.Item
           label='单位'
           name='agencyIds'
           rules={[{ required: true, message: '此项为必填项！' }]}>
           <Select mode='multiple' onChange={unitChange}>
             {props.userinfo?.systemUnitList.map(
               (i: { id: number; unitName: string }) => (
                 <Select.Option key={i.id} value={i.id}>
                   {i.unitName}
                 </Select.Option>
               )
             )}
           </Select>
         </Form.Item>
              <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='查询条数' name='limit' rules={[{pattern: /^(?:[1-9]?\d|100)$/, message: '请输入0-100的整数'}]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='警报状态' name='alarmStatus'>
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
