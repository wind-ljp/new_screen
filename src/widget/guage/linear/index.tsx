/*
 * @Description: 渐变仪表
 * @Author: liaojingping
 * @Date: 2024-06-05 15:06:52
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:19:37
 */
/* eslint-disable react-hooks/exhaustive-deps */
import Charts from '@jiaminghi/data-view-react/es/charts'
import { FC, useEffect, useMemo, useState } from 'react'
// echarts类型
import { IEchartConfig } from '../../../types'
// 处理options
import { getStyles } from '../../../utils/tools'
import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
import { style } from 'glamor'

interface IBarProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Linear: FC<IBarProps> = ({ options, data, field }) => {
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
    const currentData = newData && newData[field] ? newData[field] : []
    return {
      options,
      data: currentData
    }
  }, [newData, field, options])

  return (
    <Charts
      style={getStyles(options)}
      option={{
        series: [
          {
            type: 'gauge',
            data: [
              {
                name: 'itemA',
                value: getOption.data,
                gradient: [
                  getOption.options.linearColor1 ?? '#e7bcf3',
                  getOption.options.linearColor2 ?? '#e690d1',
                  getOption.options.linearColor3 ?? '#fb7293'
                ]
              }
            ],
            animationCurve: 'easeInOutBack',
            animationEnd: true,
            center: [
              getOption.options.dataItemStyle_centerX,
              getOption.options.dataItemStyle_centerX
            ], // 中心点
            startAngle: getOption.options.dataItemStyle_startAngle, // 起始角度（弧度值）
            endAngle: getOption.options.dataItemStyle_endAngle, // 结束角度（弧度值）
            radius: getOption.options.dataItemStyle_radius, // 半径
            splitNum: getOption.options.dataItemStyle_splitNum, // 分隔数目
            arcLineWidth: getOption.options.dataItemStyle_arcLineWidth, // 圆弧线条宽度
            dataItemStyle: {
              lineCap: getOption.options.dataItemStyle_lineCap
            },
            min: getOption.options.dataItemStyle_min,
            max: getOption.options.dataItemStyle_max,
            axisTick: {
              // 坐标刻度配置项
              show: getOption.options.axisTick_show,
              tickLength: getOption.options.axisTick_tickLength,
              style: {
                stroke: getOption.options.axisTick_stroke,
                lineWidth: getOption.options.axisTick_lineWidth
              }
            },
            axisLabel: {
              // 坐标标签配置项
              show: getOption.options.axisLabel_show,
              formatter: '{value}' + getOption.options.axisLabel_formatter, // 坐标标签内容格式
              style: {
                fill: getOption.options.axisLabel_fill,
                fontSize: getOption.options.axisLabel_fontSize
              },
              // data: ['10', '20', '50', '80', '100'], // 可自动计算
              labelGap: getOption.options.axisLabel_labelGap // 坐标标签与刻度线间的间隔
            },
            pointer: {
              // 指针配置项
              show: getOption.options.pointer_show,
              valueIndex: getOption.options.pointer_valueIndex, // 从data中获取索引值
              style: {
                scale: [
                  getOption.options.pointer_scaleX,
                  getOption.options.pointer_scaleY
                ], // 可以调节scale的值放大缩小指针
                fill: getOption.options.pointer_fill
              }
            },
            details: {
              // 圆弧详情配置
              show: getOption.options.details_show,
              formatter:
                getOption.options.details_formatter_front +
                '{value}' +
                getOption.options.details_formatter,
              offset: [
                getOption.options.details_offsetX,
                getOption.options.details_offsetY
              ],
              valueToFixed: getOption.options.details_valueToFixed,
              style: {
                fill: getOption.options.details_fill,
                fontSize: getOption.options.details_fontSize
              },
              position: 'center'
            },
            backgroundArc: {
              // 背景环配置项
              show: getOption.options.backgroundArc_show,
              style: {
                stroke: getOption.options.backgroundArc_stroke,
                lineWidth: getOption.options.backgroundArc_lineWidth,
                lineCap: getOption.options.backgroundArc_lineCap
              }
            }
          }
        ]
      }}
    />
  )
}

export default Linear
