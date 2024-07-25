/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:22:15
 * @FilePath: \bigscreen\src\widget\pie\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, useMemo, useState, useEffect } from 'react'
// 自定义ehcarts
import CustomEcharts from '../../components/echarts'
// echarts类型
import { IEchartConfig } from '../../types'
// 处理options
import { handleEchartsOption, handleData } from '../../utils/echarts'
import { getStyles } from '../../utils/tools'

import { post, get } from '../../service/fetch'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'ahooks'

interface IPieProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Pie: FC<IPieProps> = ({ options, data, field }) => {
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
    
    return {
      ...configuration,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,.6)',
        borderColor: 'rgba(255,255,255,.2)',
        padding: [8, 8],
        textStyle: {
          color: '#fff'
        }
      },
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
        ? series.map((item, index) => ({
            ...configuration.pie.series,
            ...item,
            data: currentData[index].data
          }))
        : []
    }
  }, [newData, field, options])

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default Pie
