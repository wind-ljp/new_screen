/*
 * @Description: 词云图
 * @Author: liaojp
 * @Date: 2022-09-27 20:53:29
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:26:10
 * @FilePath: \bigscreen\src\widget\wordcloud\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, useMemo, useState, useEffect } from 'react'
import CustomEcharts from '../../components/echarts'
import { IEchartConfig } from '../../types'
import { handleEchartsOption } from '../../utils/echarts'
import { getStyles } from '../../utils/tools'
import { post, get } from '../../service/fetch'
import { useLocation } from 'react-router-dom'

interface IWordcloudProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Wordcloud: FC<IWordcloudProps> = ({ options, data, field }) => {
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
  }, [location.pathname, dataValue, data])
  // 处理echarts数据
  const getOption = useMemo(() => {
    const configuration = handleEchartsOption(options)
    const currentData = newData && newData[field] ? newData[field] : []
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,.6)',
        borderColor: 'rgba(255,255,255,.2)',
        padding: [8, 8],
        textStyle: {
          color: '#fff'
        }
      },
      series: currentData
        ? currentData.map((item: any) => ({
            ...configuration.wordcloud.series,
            data: item.data,
            name: item.seriesName
          }))
        : []
    }
  }, [newData, field, options])

  return <CustomEcharts style={getStyles(options)} options={getOption} />
}

export default Wordcloud
