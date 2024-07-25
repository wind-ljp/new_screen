/*
 * @Author: liaojingping
 * @Date: 2023-03-16 10:47:27
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:38:49
 * @FilePath: \配置大屏\src\pages\three\components\modal\index.tsx
 * @Description: 传感器弹窗
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import React, { useRef, useState, useEffect } from 'react'
import { getFormData } from '../../../../utils/tools'
// import * as echarts from 'echarts'
import { Modal } from 'antd'
import { IAnyObject } from '../../../../types'
import successIcon from '../../../../assets/image/three/success.png'
import errorIcon from '../../../../assets/image/three/error.png'
import './index.scss'
import {
  waterDeviceData,
  waterPointData,
  emsDeviceData,
  samplingPointData
} from '../../../../service/sensorModal'
import session from '../../../../utils/session-storage'
import { useMount } from 'ahooks'
let timer: any

interface ModalProps {
  modalOpen: boolean
  closeModal: () => void
  selectedId: any
  selectedType: any
  selectedName: any
  data: any
  height: number
  removeSensorClick: () => void
  restoreSensorClick: () => void
}

const App: React.FC<ModalProps> = ({
  modalOpen,
  closeModal,
  selectedId,
  selectedType,
  selectedName,
  data,
  height = 433,
  restoreSensorClick,
  removeSensorClick
}) => {
  const ref = useRef(null)
  const [newData, setNewData] = useState(data)
  const [chartDone, setChartDone] = useState(false)

  useEffect(() => {
    timer = setTimeout(() => {
      if (selectedType === 0) {
        // 设备
        waterDeviceData({
          id: selectedId
        }).then((res) => {
          if (res.data) {
            setNewData(res.data)
          }
        })
      }
      if (selectedType === 1) {
        // 测点
        waterPointData(getFormData({ pointId: selectedId })).then((res) => {
          if (res.data) {
            setNewData(res.data)
          }
        })
      }
      if (selectedType === 2) {
        // 主机
        emsDeviceData({
          agencyId: session.getItem('defaultUnitId'),
          deviceId: selectedId
        }).then((res) => {
          if (res.data) {
            setNewData(res.data)
          }
        })
      }
      if (selectedType === 6) {
        // 取样点
        samplingPointData(getFormData({ pointId: selectedId })).then((res) => {
          if (res.data) {
            setNewData(res.data)
          }
        })
      }
    }, 5 * 1000)
    return () => clearTimeout(timer)
  }, [newData, selectedId, selectedType])

  useMount(() => {
    setChartDone(true)
  })

  const drawContent = (type: number, id: number | string) => {
    removeSensorClick() // 移除 sensor click事件
    if (type === 0) {
      // 水文设备
      return newData ? (
        <div
          style={{
            display: 'flex',
            fontSize: '20px',
            color: '#71BEFF',
            margin: '56px 0 0 65px',
            fontWeight: 400
          }}>
          <div
            style={{
              width: '385px'
            }}>
            <div
              style={{
                display: 'flex'
              }}>
              <div style={{ width: '100px' }}>设备类型：</div>
              <div style={{ color: '#fff' }}>{newData[0]?.typeName}</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '20px'
              }}>
              <div style={{ width: '100px' }}>设备状态：</div>
              <img
                width='24'
                height='24'
                style={{ marginTop: '4px' }}
                src={newData[0]?.deviceStatus ? successIcon : errorIcon}
                alt='设备状态'
              />
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '20px'
              }}>
              <div style={{ width: '100px' }}>电源电压：</div>
              <div style={{ color: '#fff' }}>{newData[0]?.batteryVoltage}</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '20px'
              }}>
              <div style={{ width: '100px' }}>结束时间：</div>
              <div style={{ color: '#fff' }}>{newData[0]?.endTime}</div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'flex'
              }}>
              <div style={{ width: '100px' }}>设备号：</div>
              <div style={{ color: '#fff' }}>{newData[0]?.deviceNum}</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '20px'
              }}>
              <div style={{ width: '100px' }}>启用状态：</div>
              <img
                width='24'
                height='24'
                style={{ marginTop: '4px' }}
                src={newData[0]?.status ? successIcon : errorIcon}
                alt='启用状态'
              />
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '20px'
              }}>
              <div style={{ width: '100px' }}>开始时间：</div>
              <div style={{ color: '#fff' }}>{newData[0]?.startTime}</div>
            </div>
          </div>
        </div>
      ) : null
    }
    if (type === 1) {
      // 水文测点
      return newData ? (
        <div
          style={{
            fontSize: '20px',
            color: '#71BEFF',
            fontWeight: 400,
            height: '80%',
            padding: '58px 0 0 65px',
            overflowY: 'auto'
          }}>
          {newData.map((item: IAnyObject, index: number) => (
            <div
              className='point-list'
              key={index}
              style={{ display: 'flex', paddingLeft: '11px' }}>
              <div
                style={{
                  width: '3px',
                  height: '20px',
                  background: '#50DCFF',
                  position: 'relative',
                  right: '10px',
                  top: '6px'
                }}
              />
              <div
                style={{
                  width: '385px'
                }}>
                <div style={{ display: 'flex' }}>
                  <div>监测类型：</div>
                  <div>{item?.monitorTypeName}</div>
                </div>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                  <div>采集时间：</div>
                  <div>{item?.collectionTime}</div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex' }}>
                  <div>数值：</div>
                  <div>{item?.data}</div>
                </div>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                  <div>数据状态：</div>
                  <img
                    width='24'
                    height='24'
                    style={{ marginTop: '4px' }}
                    src={item?.status ? successIcon : errorIcon}
                    alt='设备状态'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null
    }
    if (type === 2) {
      // 电法主机
      return newData ? (
        <div
          style={{
            display: 'flex',
            fontSize: '20px',
            color: '#71BEFF',
            fontWeight: 400,
            height: '86%',
            padding: '58px 0 0 65px'
          }}>
          <div
            style={{
              width: '385px'
            }}>
            <div style={{ display: 'flex' }}>
              <div>所属工区：</div>
              <div style={{ color: '#fff' }}>{newData?.emsAreaName}</div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>转换器个数：</div>
              <div style={{ color: '#fff' }}>
                {newData?.deviceStatusDTO?.converterNum}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>电极个数：</div>
              <div style={{ color: '#fff' }}>
                {newData?.deviceStatusDTO?.poleNum}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>是否在采样：</div>
              <div style={{ color: '#fff' }}>
                {newData?.deviceStatusDTO?.isCollecting ? '是' : '否'}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>进度：</div>
              <div style={{ color: '#fff' }}>
                {newData?.jobFileDTO?.exeStatus}
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <div>主机状态：</div>
              <img
                width='24'
                height='24'
                style={{ marginTop: '4px' }}
                src={
                  newData?.deviceStatusDTO?.deviceStatus
                    ? successIcon
                    : errorIcon
                }
                alt='主机状态'
              />
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>控制器个数：</div>
              <div style={{ color: '#fff' }}>
                {newData?.deviceStatusDTO?.controlerNum}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>状态更新时间：</div>
              <div style={{ color: '#fff' }}>
                {newData?.deviceStatusDTO?.startTime}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>当前作业：</div>
              <div style={{ color: '#fff' }}>
                {newData?.jobFileDTO?.jobFileName}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>作业更新时间：</div>
              <div style={{ color: '#fff' }}>
                {newData?.jobFileDTO?.statusUpdateTime}
              </div>
            </div>
          </div>
        </div>
      ) : null
    }
    if (type === 6) {
      // 取样点
      if (chartDone && newData) {
        const chartDom: any = ref.current
        // const myChart = echarts.init(chartDom)

        let myChart = window.echarts.getInstanceByDom(chartDom)
        if (myChart == undefined) {
          myChart = window.echarts.init(chartDom)
        }
        myChart.clear()

        let option
        option = {
          grid: {
            top: 60,
            bottom: 30,
            right: 100,
            left: 50
          },
          title: {
            show: true,
            text: '各离子指标走势图',
            top: '19px',
            left: '320px',
            textStyle: {
              fontSize: 20,
              color: '#ffffff',
              fontWeight: 400,
              width: 162,
              height: 19,
              fontFamily: 'Courier New'
            }
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 10,
            bottom: 10,
            textStyle: {
              color: '#fff'
            },
            data: newData.map((i: { seriesName: string }) => i.seriesName)
          },
          tooltip: {
            show: true
          },
          xAxis: {
            type: 'category',
            data: newData[0].data.map(
              (i: { name: string }) => i.name.split(' ')[0]
            )
          },
          yAxis: {
            type: 'value',
            splitLine: false
          },
          series: newData.map((i: { seriesName: string; data: any[] }) => {
            return {
              name: i.seriesName,
              type: 'line',
              data: i.data.map((j) => j.value)
            }
          })
        }
        option && myChart.setOption(option)
      }
      return (
        <div
          style={{
            textAlign: 'center',
            height: '86%'
          }}>
          <div
            id='chart'
            ref={ref}
            style={{
              height: '100%'
            }}></div>
        </div>
      )
    }
  }

  return (
    <Modal
      width={826}
      style={{
        height: `${height}px`
      }}
      title={selectedName}
      open={modalOpen}
      onCancel={(e) => {
        clearInterval(timer)
        e.stopPropagation()
        restoreSensorClick() // 还原 sensor click 事件
        closeModal()
      }}
      footer={null}
      mask={false}
      maskClosable={false}
      getContainer={false}
      destroyOnClose
      wrapClassName='modelBoxModal'>
      {drawContent(selectedType, selectedId)}
    </Modal>
  )
}

export default App
