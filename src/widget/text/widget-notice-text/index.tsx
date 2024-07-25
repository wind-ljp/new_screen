/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 竖向单切换文本
 * @Author: liaojingping
 * @Date: 2024-06-13 11:23:40
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:25:44
 */
import { FC, useState, useEffect } from 'react'
import { IAnyObject } from '../../../types'
import { getStyles } from '../../../utils/tools'
import './index.scss'
import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
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
    <>
      {newData && newData[field] ? (
        <Swiper
          modules={[Autoplay]}
          style={Object.assign(getStyles(options), {
            zIndex: 0
          })}
          autoplay={{
            delay: options?.noticeDelay || 2500
          }}
          direction={'vertical'}
          loop>
          {newData[field].map((i: string) => (
            <SwiperSlide key={i}>{i}</SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </>
  )
}
export default BaseText
