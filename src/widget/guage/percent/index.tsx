/*
 * @Description: 百分比环
 * @Author: liaojingping
 * @Date: 2024-05-29 13:38:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:19:57
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

interface IBarProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Percent: FC<IBarProps> = ({ options, data, field }) => {
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
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: getOption.options.arcLineWidth ?? 25,
            data: [
              {
                name: 'itemA',
                value: getOption.data,
                gradient: [
                  getOption.options.gradient1 ?? '#03c2fd',
                  getOption.options.gradient2 ?? '#1ed3e5',
                  getOption.options.gradient3 ?? '#2fded6'
                ]
              }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            details: {
              show: true,
              formatter: '{value}' + options.percenLabel,
              style: {
                fill: getOption.options.labelColor ?? '#1ed3e5',
                fontSize:getOption.options.labelFontSize ?? 35
              }
            },
            animationEnd: true
          }
        ]
      }}
    />
  )
}

export default Percent
