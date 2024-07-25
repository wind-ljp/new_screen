/*
 * @Author: huanglili
 * @Date: 2024-06-018 09:16:55
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:59:29
 * @FilePath: \BScreenWebFE\src\pages\report\dataSource\components\pressure.tsx
 * @Description: 矿压监测
 */
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table'
import { getEngineering, getEngineeringAll, getSensor, getSensorSource, getSensorType, getCh } from '../../../../service/source'
import { IAnyObject } from '../../../../types'
import clip from '../../../../utils/clipboard'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
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
    title: '系统运行状态',
    address: '/bigscreen/mp/systemStatusTable',
    note: '推荐：滚动表格'
  },
  {
    key: 2,
    title: '巷道传感器类型分布',
    address: '/bigscreen/mp/tunnelTypeRadarChart',
    note: '推荐：雷达图'
  },
  {
    key: 3,
    title: '工作面传感器类型分布',
    address: '/bigscreen/mp/workFaceTypeRadarChart',
    note: '推荐：雷达图'
  },
  {
    key: 4,
    title: '巷道掘进进度',
    address: '/bigscreen/mp/drilling/1',
    note: '推荐：曲线图'
  },
  {
    key: 5,
    title: '工作面回采进度',
    address: '/bigscreen/mp/drilling/2',
    note: '推荐：曲线图'
  },
  {
    key: 6,
    title: '设备数',
    address: '/bigscreen/mp/deviceCount',
    note: '推荐：字符串'
  },
  {
    key: 7,
    title: '实时数据数',
    address: '/bigscreen/mp/realDataCount',
    note: '推荐：字符串'
  },
  {
    key: 8,
    title: '本年度历史数据数',
    address: '/bigscreen/mp/historyDataCount',
    note: '推荐：字符串'
  },
  {
    key: 9,
    title: '待处理预警数',
    address: '/bigscreen/mp/pendingAlarmCount',
    note: '推荐：字符串'
  },
  {
    key: 10,
    title: '工作面支架压力安全阀开启率',
    address: '/bigscreen/mp/safetyRateHistogram',
    note: '推荐：柱状图'
  },
  {
    key: 11,
    title: '工作面支架压力初撑力合格率',
    address: '/bigscreen/mp/initialPassRateHistogram',
    note: '推荐：柱状图'
  },
  {
    key: 12,
    title: '历史数据--按传感器区分',
    address: '/bigscreen/mp/getHistoryDataEchart/0',
    note: '推荐：曲线图'
  },
  {
    key: 13,
    title: '历史数据--按通道区分',
    address: '/bigscreen/mp/getHistoryDataEchart/1',
    note: '推荐：曲线图'
  },
  {
    key: 14,
    title: '离线设备数',
    address: '/bigscreen/mp/deviceOfflineCount',
    note: '推荐：字符串'
  },
  {
    key: 15,
    title: '未处理预警信息',
    address: '/bigscreen/mp/pendingAlarmTable',
    note: '推荐：滚动表格'
  }
]

const App = (props: { userinfo: any }) => {
  const actionRef = useRef<ActionType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dataId, setDataId] = useState<number>(0)
  const [form] = Form.useForm()
  const [engList, setEngList] = useState([])//位置
  const [sensorTypeList, setSensorTypeList] = useState([])//传感器类型
  const [sensorList, setSensorList] = useState([])//测点
  const [chList, setChList] = useState([])//数据源
  const [calculateTypeList, setCalculateTypeList] = useState([])//数据源
  const [uniId, setUniId] = useState()
  const [engId, setEngId] = useState()
  const [sensorTypeId, setSensorTypeId] = useState()
  const [tunnelList, setTunnelList] = useState([])//巷道
  const [faceList, setFaceList] = useState([])//工作面
 
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
                // if (record.key === 3||record.key === 2) {
                  form.setFieldsValue({
                    agencyId:''
                  })
                // }
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
      if (res.calculateTypeId == '0') {
        delete res.calculateTypeId
      }
      if (res.startTime) {
        res.startTime = moment(res.startTime).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.endTime) {
        res.endTime = moment(res.endTime).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.sensorIds&&!(Array.isArray(res.sensorIds))){
        res.sensorIds = [res.sensorIds];
      }
      if (res.chs&&!(Array.isArray(res.chs))){
        res.chs = [res.chs];
      }
      if (res.alarmTimeStart) {
        res.alarmTimeStart = moment(res.alarmTimeStart).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.alarmTimeEnd) {
        res.alarmTimeEnd = moment(res.alarmTimeEnd).format('YYYY-MM-DD HH:mm:ss')
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

    // getAcEmsArea().then((res: any) => {
    //   setAreaList(
    //     res.data.map((i: { areaName: string; areaId: number }) => {
    //       return {
    //         label: i.areaName,
    //         value: i.areaId
    //       }
    //     })
    //   )
    //   console.log(areaList);
    // })
   
  }, [])
  const unitChange = (val: any) => {
    if (dataId === 4) {
      getEngineering( val,1 ).then((res) => {
        setTunnelList(
          res.data.map((i: { engName: string; engId: number }) => {
            return {
              label: i.engName,
              value: i.engId
            }
          })
        )
      })
    }
    if (dataId === 5) {
      getEngineering( val,2 ).then((res) => {
        setFaceList(
          res.data.map((i: { engName: string; engId: number }) => {
            return {
              label: i.engName,
              value: i.engId
            }
          })
        )
      })
    }
    if (dataId === 12) {
      form.setFieldsValue({
        engId:'',
        sensorTypeId:'',
        sensorIds:[],
        chs:[],
        calculateTypeId:''
      })
      getEngineeringAll( val).then((res: any) => {
        if (res.code == 200) {
          setUniId(val)
          setEngList(
          res.data.map((i: { engName: string; engId: number }) => {
            return {
              label: i.engName,
              value: i.engId
            }
          })
        )
        }
      })
    }
    if (dataId === 13) {
      form.setFieldsValue({
        engId:'',
        sensorTypeId:'',
        sensorIds:[],
        chs:[],
        calculateTypeId:''
      })
      getEngineeringAll( val).then((res: any) => {
        if (res.code == 200) {
          setUniId(val)
          setEngList(
          res.data.map((i: { engName: string; engId: number }) => {
            return {
              label: i.engName,
              value: i.engId
            }
          })
        )
        }
      })
    }
  }
  const engChange = (val: any) => {
    form.setFieldsValue({
      sensorTypeId:'',
      sensorIds:[],
      chs:[],
      calculateTypeId:''
    })
    getSensorType( {engId:engId}).then((res: any) => {
      setEngId(val)
      setSensorTypeList(
        res.data.map((i: { sensorTypeName: string; sensorTypeId: number }) => {
          return {
            label: i.sensorTypeName,
            value: i.sensorTypeId
          }
        })
      )
    })
  }
  const sensorTypeChange = (val: any) => {
    form.setFieldsValue({
      sensorIds:[],
      chs:[],
      calculateTypeId:''
    })
    getSensor( {engId:engId,sensorTypeId:val,agencyId:uniId}).then((res: any) => {
      setSensorTypeId(val)
      setSensorList(
        res.data.map((i: { sensorName: string; sensorId: number }) => {
          return {
            label: i.sensorName,
            value: i.sensorId
          }
        })
      )
    })
  }
  const sensorChange = (val: any) => {
    form.setFieldsValue({
      calculateTypeId:''
    })
      // 数据源
      const data: any = [];
      data[0] = { label: '原始数据',value:'0' };
      if (sensorTypeId === 1) {
        getSensorSource( ).then((res: any) => {
          res.data.map((i: { calculateTypeName: string; calculateTypeId: number }) => {
            data.push({
              label: i.calculateTypeName,
              value: i.calculateTypeId
            }) 
          })
          setCalculateTypeList(data)
        })
      } else {
        setCalculateTypeList(data)
      }
      //通道
      getCh( {engId:engId,sensorTypeId:sensorTypeId}).then((res: any) => {
        setChList(
          res.data.map((i: { name: string; id: number }) => {
            return {
              label: i.name,
              value: i.id
            }
          })
        )
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
        <Form form={form} initialValues={{recentTime:168}}>
          {dataId !== 15 ? (
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
          ) : null}

          {dataId === 4 ? (
            <>
              <Form.Item
                label='巷道'
                name='engIds'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select  maxTagCount={5} options={tunnelList} mode="multiple"/>
              </Form.Item>
            </>
          ) : null}

          {dataId === 5 ? (
            <>
              <Form.Item
                label='工作面'
                name='engIds'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <Select  maxTagCount={5} options={faceList} mode="multiple"/>
              </Form.Item>
            </>
          ) : null}

          {dataId === 12 ? (
            <>
            <Form.Item
            label='位置'
            name='engId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={engList}
                  onChange={engChange}
                />
          </Form.Item>
          <Form.Item
            label='传感器类型'
            name='sensorTypeId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={sensorTypeList}
                  onChange={sensorTypeChange}
                />
          </Form.Item>
          <Form.Item
            label='测点'
            name='sensorIds'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  mode="multiple"
                  options={sensorList}
                  onChange={sensorChange}
                />
          </Form.Item>
          <Form.Item
            label='通道'
            name='chs'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={chList}
                />
          </Form.Item>
          <Form.Item
            label='数据源类型'
            name='calculateTypeId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={calculateTypeList}
                
                />
          </Form.Item>
           <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='	最近时间(时)' name='recentTime'>
                <Input style={{ width: '100%' }} />
              </Form.Item>
            </>
          ) : null}

          {dataId === 13 ? (
            <>
            <Form.Item
            label='位置'
            name='engId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={engList}
                  onChange={engChange}
                />
          </Form.Item>
          <Form.Item
            label='传感器类型'
            name='sensorTypeId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={sensorTypeList}
                  onChange={sensorTypeChange}
                />
          </Form.Item>
          <Form.Item
            label='测点'
            name='sensorIds'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={sensorList}
                  onChange={sensorChange}
                />
          </Form.Item>
          <Form.Item
            label='通道'
            name='chs'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  mode="multiple"
                  options={chList}
                />
          </Form.Item>
          <Form.Item
            label='数据源类型'
            name='calculateTypeId'
            rules={[{ required: true, message: '此项为必填项！' }]}>
            <Select
                  maxTagCount={5}
                  options={calculateTypeList}
                />
          </Form.Item>
           <Form.Item
                label='开始时间'
                name='startTime'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='endTime'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='	最近时间(时)' name='recentTime'>
                <Input style={{ width: '100%' }} />
              </Form.Item>
            </>
          ) : null}

          {dataId === 15 ? (
            <>
              <Form.Item
                label='单位'
                name='agentId'
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
              <Form.Item
                label='开始时间'
                name='alarmTimeStart'
                rules={[{ required: true, message: '此项为必填项！' }]}>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='结束时间' name='alarmTimeEnd'>
                <DatePicker style={{ width: '100%' }} showTime showNow />
              </Form.Item>
              <Form.Item label='	最近时间(时)' name='recentTime'>
                <Input style={{ width: '100%' }} />
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
