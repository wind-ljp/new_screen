/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-10-08 14:01:25
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:23:42
 */
import { FC, useEffect, useMemo, useState } from 'react'
// 自定义ehcarts
import CustomEcharts from '../../../components/echarts'
// echarts类型
import { IEchartConfig } from '../../../types'
// 处理options
import { handleEchartsOption, handleData } from '../../../utils/echarts'
import { getStyles } from '../../../utils/tools'
import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'ahooks'

interface ThreeBarProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const ThreeBar: FC<ThreeBarProps> = ({ options, data, field }) => {
  const { dataValue } = options
  const [newData, setNewData] = useState(data)
  const location = useLocation()
  useEffect(() => {
    let intervalId: any

    const fetchData = async () => {
      try {
        let response

        if (dataValue.method === 'get') {
          response = await get({
            url: dataValue.url,
            loading: true,
            params: dataValue.params
          })
        } else if (dataValue.method === 'post') {
          response = await post({
            url: dataValue.url,
            loading: true,
            data: dataValue.params
          })
        }

        setNewData(response)
      } catch (error) {
        console.error(error)
      }
    }

    if (
      location.pathname === '/frame/preview' &&
      dataValue.autoTime &&
      dataValue.dataType === 'dynamic'
    ) {
      intervalId = setInterval(fetchData, dataValue.autoTime)
    } else {
      setNewData(data)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    location.pathname,
    dataValue,
    (prevDataValue: any) =>
      JSON.stringify(prevDataValue) === JSON.stringify(dataValue)
  ])

  // 处理echarts数据
  const getOption = useMemo(() => {
    const configuration = handleEchartsOption(options)
    const currentData = newData && newData[field] ? newData[field] : []
    return {
      ...configuration,
      backgroundColor: '',
      grid3D: {
        show: options.axis2Status
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,.6)',
        borderColor: 'rgba(255,255,255,.2)',
        padding: [8, 8],
        textStyle: {
          color: '#fff'
        }
      },
      xAxis3D: {
        name: options.x3Name || '',
        type: 'category',
        axisLabel: {
          textStyle: {
            color: options.axis3LabelColor
          }
        },
        nameTextStyle: {
          color: options.axis3TextColor
        }
      },
      yAxis3D: {
        name: options.y3Name || '',
        type: 'category',
        axisLabel: {
          textStyle: {
            color: options.axis3LabelColor
          }
        },
        nameTextStyle: {
          color: options.axis3TextColor
        }
      },
      zAxis3D: {
        name: options.z3Name || '',
        axisLabel: {
          textStyle: {
            color: options.axis3LabelColor
          }
        },
        nameTextStyle: {
          color: options.axis3TextColor
        }
      },
      visualMap: {
        max: options.g3Max || 100,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        }
      },
      dataset: {
        source: currentData
      },
      series: [
        {
          type: 'bar3D',
          shading: 'lambert'
        }
      ]
    }
  }, [newData, field, options])

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default ThreeBar
