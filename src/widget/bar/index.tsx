/*
 * @Author: liaojingping
 * @Date: 2022-11-25 12:44:41
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:06:38
 * @FilePath: \bigscreen-develop\src\widget\bar\index.tsx
 * @Description: 柱状图
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react'
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

interface IBarProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Bar: FC<IBarProps> = ({ options, data, field }) => {
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
    // const currentData = data && data[field] ? data[field] : []
    const currentData = newData && newData[field] ? newData[field] : []
    const { legendData, xAxisData, yAxisData, series } = handleData(currentData)
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
      series: options?.barBorderShow
        ? series
          ? series.map((item) => ({
              ...configuration.bar.series,
              ...item,
              ...{
                itemStyle: {
                  barBorderRadius: options?.barBorderShowRadius ?? 5,
                  borderWidth: options?.barBorderShowWidth ?? 1,
                  borderType: options?.barBorderShowType ?? 'solid',
                  borderColor: options?.barBorderShowColor ?? '#73c0de',
                  shadowColor: options?.barShadowShowColor ?? '#5470c6',
                  shadowBlur: options?.barShadowShowBlur ?? 3
                }
              }
            }))
          : []
        : series
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

  const seriesLength = getOption.series.length
  if (options.isShowBarSide) {
    for (let i = 0; i < seriesLength; i++) {
      // 分隔
      const newSeriesItem = {
        ...getOption.series[i],
        type: 'pictorialBar',
        itemStyle: {
          normal: {
            color: options?.isBarSideLinear
              ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: options?.barSideLinearColor
                  ? options?.barSideLinearColor.map(
                      (i: { offset: string; color: string }) => {
                        return {
                          offset: parseFloat(i.offset),
                          color: i.color
                        }
                      }
                    )
                  : [],
                global: false // 缺省为 false
              }
              : options?.barSideColor ?? '#0F375F'
          }
        },
        symbolRepeat: 'fixed',
        symbolMargin: 6,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [getOption.series[i].barWidth, options?.barSideHeight ?? 5],
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        z: 0,
        zlevel: 1,
        tooltip: {
          show: false
        }
      }
      // 背景
      const newSeriesItem2 = {
        ...getOption.series[i],
        type: 'line',
        smooth: true,
        showAllSymbol: false,
        symbolSize: 0,
        lineStyle: {
          width: 0
        },
        areaStyle: {
          color: options?.isBarSideBackgroundLinear
            ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: options?.barSideBackgroundLinearColor
                  ? options?.barSideBackgroundLinearColor.map(
                      (i: { offset: string; color: string }) => {
                        return {
                          offset: parseFloat(i.offset),
                          color: i.color
                        }
                      }
                    )
                  : [],
                global: false // 缺省为 false
              }
            : options?.barSideBackgroundColor
        },
        z: 5,
        tooltip: {
          show: false
        }
      }
      getOption.series.push(
        newSeriesItem,
        options?.isShowBarSideBackground ? newSeriesItem2 : {}
      )
      getOption.series = [...new Set(getOption.series)]
    }
  }

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default Bar
