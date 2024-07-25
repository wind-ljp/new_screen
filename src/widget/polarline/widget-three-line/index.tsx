/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-13 13:45:53
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:24:16
 */
import { FC, useMemo, useState, useEffect } from 'react'
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

interface IBaseLineProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const PolarLine: FC<IBaseLineProps> = ({ data, field, options }) => {
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
      tooltip: {
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(0,0,0,.6)',
        borderColor: 'rgba(255,255,255,.2)',
        padding: [8, 8],
        textStyle: {
          color: '#fff'
        }
      },
      backgroundColor: '',
      visualMap: {
        show: false,
        max: options.g3MaxLine || 100,
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
      xAxis3D: {
        name: options.x3NameLine || '',
        type: 'value',
        axisLabel: {
          textStyle: {
            color: options.axis3LabelColorLine
          }
        },
        nameTextStyle: {
          color: options.axis3TextColorLine
        }
      },
      yAxis3D: {
        name: options.y3NameLine || '',
        type: 'value',
        axisLabel: {
          textStyle: {
            color: options.axis3LabelColorLine
          }
        },
        nameTextStyle: {
          color: options.axis3TextColorLine
        }
      },
      zAxis3D: {
        name: options.z3NameLine || '',
        type: 'value',
        axisLabel: {
          textStyle: {
            color: options.axis3LabelColorLine
          }
        },
        nameTextStyle: {
          color: options.axis3TextColorLine
        }
      },
      grid3D: {
        show: options.axis2StatusLine,
        viewControl: {
          projection: 'orthographic'
        }
      },
      series: [
        {
          type: 'line3D',
          data: currentData
        }
      ]
    }
  }, [newData, field, options])

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default PolarLine