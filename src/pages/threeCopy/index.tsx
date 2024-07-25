/*
 * @Author: liaojingping
 * @Date: 2022-11-16 10:36:31
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:03:31
 * @FilePath: \配置大屏\src\pages\threeCopy\index.tsx
 * @Description: 三维模型底图
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import { IAnyObject } from '../../types'
import { useEffect, useState } from 'react'
import img1 from '../assets/image/three/1.png'
import img6 from '../assets/image/three/6.png'
import './index.scss'

const TM = (props: { screen: IAnyObject }) => {

  const [imgPath, setImgPath] = useState<string>('')

  // useEffect(() => {
  //   if (props.screen.threeModelSource === '1') {
  //     setImgPath(img1)
  //   } else if (props.screen.threeModelSource === '6') {
  //     setImgPath(img6)
  //   } else {
  //     setImgPath('')
  //     getAllThreeModel(props.screen.threeModelSource).then(res => {
  //       if (res?.data?.length) {
  //         setImgPath(res.data[0].pictureUrl)
  //       }
  //     })
  //   }
  // }, [props.screen.threeModelSource])



  return (
    <>
      <div
        className='three-page'
        id='three'
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          zIndex: '-1'
          // background: `url(${imgPath}) center center no-repeat`
          // backgroundSize: imgPath.length ? '100% 100%' : ''
        }}
      />
    </>
  )
}
export default TM
