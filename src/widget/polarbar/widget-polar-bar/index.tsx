/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-09-27 13:48:18
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:23:05
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

interface IBarProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const PolarBar: FC<IBarProps> = ({ options, data, field }) => {
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
    const { series, xAxisData } = handleData(currentData)
    
    return {
      ...configuration,
      polar: {
        radius: [options.polarF || 30 , options.polarS || '80%']
      },
      radiusAxis: {},
      angleAxis: {
        type: 'category',
        data: xAxisData ? xAxisData : [],
        startAngle: options.startAngle || 75
      },
      series: {
        type: 'bar',
        data: series ? series[0].data : [],
        coordinateSystem: 'polar'
      },
      animation: false
    }
  }, [newData, field, options])

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default PolarBar