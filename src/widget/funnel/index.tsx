/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: liaojingping
 * @Date: 2022-11-25 12:44:41
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:18:57
 * @FilePath: \bigscreen-develop\src\widget\funnel\index.tsx
 * @Description: 漏斗图
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
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

interface IFunnelProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Funnel: FC<IFunnelProps> = ({ options, data, field }) => {
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
    const { legendData, series } = handleData(currentData)

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
      series: series
        ? series.map((item, index) => ({
            ...configuration.funnel.series,
            name: item.name,
            labelLine: {
              length: 10,
              lineStyle: {
                width: 0,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            data: currentData[index].data
          }))
        : []
    }
  }, [newData, field, options])

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default Funnel
