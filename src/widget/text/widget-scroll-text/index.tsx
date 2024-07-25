/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: liaojingping
 * @Date: 2023-01-31 14:46:01
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:25:52
 * @FilePath: \配置大屏\src\widget\text\widget-scroll-text\index.tsx
 * @Description: 滚动文本
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import './index.scss'
import { useEffect, useRef, FC, useState } from 'react'
import { IAnyObject } from '../../../types'
import { getStyles } from '../../../utils/tools'
import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
const seamless = require('seamscroll/build/seamscroll.min')

interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Scroll: FC<ITableProps> = ({ data = {}, field = 'data', options }) => {
  const ref = useRef(null)
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

  useEffect(() => {
    seamless.init({
      dom: ref.current,
      step: options.step,
      hoverStop: options.hoverStop,
      // direction: options.direction
      direction: 1
    })
  }, [options.step, options.hoverStop, options.direction])

  const [scrollData, setScrollData] = useState<any[]>([])

  useEffect(() => {
    setScrollData(newData[field])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData, field])

  return options.direction === 1 ? (
    <div
      style={{
        ...getStyles(options),
        overflow: 'hidden'
      }}>
      <div>
        <ul ref={ref}>
          {scrollData.map((i, j) => (
            <li key={i + j} className='clearfix'>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div
      style={{
        ...getStyles(options),
        overflow: 'hidden'
      }}>
      <div>
        <ul className='clearfix' ref={ref}>
          <li />
          {scrollData.map((i, j) => (
            <li key={i + j}>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Scroll

/**
 * key	description	default	val
  *dom	作用的dom	null	dom
  step	步长,越大越快	1	Number
  hoverStop	是否启用鼠标hover控制	true	Boolean
  direction	方向 0 往下 1 往上 2向左 3向右	1	Number
  singleHeight	单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1	0	Number
  singleWidth	单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3	0	Number
  waitTime	单步停止等待时间(default 1s)	1000	Number
 */
