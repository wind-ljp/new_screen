/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: liaojingping
 * @Date: 2022-11-25 12:44:41
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:25:28
 * @FilePath: \bigscreen-develop\src\widget\text\widget-base-text\index.tsx
 * @Description: base-text
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import { FC, useState, useEffect } from 'react'
import { IAnyObject } from '../../../types'
import { getStyles } from '../../../utils/tools'
import './index.scss'

import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'ahooks'
interface IBaseTextProps {
  // 数据，模拟跟真实数据都走这里
  data: IAnyObject
  // 字段名
  field: string
  options: any
}

const BaseText: FC<IBaseTextProps> = ({
  data = {},
  field = 'data',
  options
}) => {
  const { dataValue } = options
  const [newData, setNewData] = useState(data)
  const location = useLocation()
  useEffect(() => {
    let intervalId: any

    const fetchData = async () => {
      try {
        let response: any

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
  return (
    <div
      onClick={() =>
        options?.locationAddress
          ? window.open(options?.locationAddress)
          : console.log('无跳转链接')
      }
      style={Object.assign(getStyles(options), {
        cursor: 'pointer'
      })}
      className='app-element app-element__basetext animated'>
      {newData[field] ?? '基础文本'}
    </div>
  )
}
export default BaseText
