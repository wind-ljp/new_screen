/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react'
import { IAnyObject } from '../../../types'
import { getStyles } from '../../../utils/tools'
import './index.scss'
import { PictureOutlined } from '@ant-design/icons'
import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
// import { Carousel } from 'antd'
import {
  Navigation,
  Autoplay,
  Pagination,
  Mousewheel,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectCards,
  EffectFlip,
  EffectCreative
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/mousewheel'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-flip'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-creative'

interface IImageProps {
  // 数据，模拟跟真实数据都走这里
  data: IAnyObject
  // 字段名
  field: string
  options: any
}

const TurnImage: FC<IImageProps> = ({ data = {}, options, field = 'data' }) => {
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
          modules={[
            Navigation,
            Autoplay,
            Pagination,
            Mousewheel,
            EffectFade,
            EffectCube,
            EffectCoverflow,
            EffectCards,
            EffectFlip,
            EffectCreative
          ]}
          style={Object.assign(getStyles(options), {
            zIndex: 0
          })}
          slidesPerView={options?.slidesPerView || 1}
          spaceBetween={options?.spaceBetween || 0}
          navigation={options?.navigation || false}
          autoplay
          pagination={
            options?.pagination
              ? {
                  clickable: true
                }
              : false
          }
          direction={options?.direction || 'horizontal'}
          mousewheel={options?.mousewheel || true}
          effect={options?.effect || 'cards'} loop={options?.loop || false}>
          {newData[field].map(
            (i: { url: string; ad: string }, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={i.url}
                  alt={i.url}
                  style={Object.assign(getStyles(options), {
                    width: '100%',
                    cursor: 'pointer'
                  })}
                  onClick={() => window.open(i.ad, '_blank')}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      ) : (
        <PictureOutlined />
      )}
    </>
  )
}
export default TurnImage
