/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-09 14:03:20
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:22:48
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

const OneColorBar: FC<IBarProps> = ({ options, data, field }) => {
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
    const { legendData, xAxisData, yAxisData, series } = handleData(currentData)
    if (options.axis1Location && series.length >= 1) {
      series[0].data[options.axis1Location - 1] = {
        value: series[0].data[options.axis1Location - 1],
        itemStyle: {
          color: options.axis1Color
        }
      }
    }
    if (options.axis2Location && series.length > 1) {
      series[1].data[options.axis2Location - 1] = {
        value: series[1]?.data[options.axis2Location - 1],
        itemStyle: {
          color: options.axis2Color
        }
      }
    }
    if (options.axis3Location && series.length > 2) {
      series[2].data[options.axis3Location - 1] = {
        value: series[2]?.data[options.axis3Location - 1],
        itemStyle: {
          color: options.axis3Color
        }
      }
    }
    return {
      ...configuration,
      legend: {
        ...configuration.legend,
        data: legendData
      },
      xAxis: {
        ...configuration.xAxis,
        data: xAxisData
      },
      yAxis: {
        ...configuration.yAxis,
        data: yAxisData
      },
      series: series
        ? series.map((item) => ({
            ...configuration.bar.series,
            ...item
          }))
        : [],
      dataZoom: [
        {
          show: options.xAxisScroll || false,
          height: options.xAxisScrollHeight,
          bottom: options.xAxisScrollLocation
        },
        {
          show: options.yAxisScroll || false,
          yAxisIndex: 0,
          width: options.yAxisScrollWidth,
          right: options.yAxisScrollLocation
        }
      ]
    }
  }, [newData, field, options])


  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default OneColorBar