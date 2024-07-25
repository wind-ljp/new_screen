/*
 * @Author: liaojingping
 * @Date: 2023-02-17 13:35:35
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:42:10
 * @FilePath: \配置大屏\src\widget\sys\index.tsx
 * @Description: 跳转子系统
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import './index.scss'
import { getStyles } from '../../utils/tools'
import { FC } from 'react'
import { ALL_STATE } from '../../store/actionType'
import { connect } from 'react-redux'
import session from '../../utils/session-storage'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface ITableProps {
  options: any
  userinfo: any
}

const WidgetSys: FC<ITableProps> = ({ options, userinfo }) => {
  const App1 = () => (
    <div
      style={{
        ...getStyles(options)
      }}>
      <div className='sys-box'>
        {userinfo?.systemSubsystemList.length > 5 ? (
          <img
            className='prev'
            src={require('../../assets/image/three/left.png')}
            alt='left-direction'
          />
        ) : null}

        <div className='center-box direction-scroll'>
          <Swiper
            style={{
              width:
                userinfo?.systemSubsystemList.length >= 5
                  ? '100%'
                  : `${20 * userinfo?.systemSubsystemList.length}%`,
              zIndex: 0,
              position: 'relative',
              left:
                userinfo?.systemSubsystemList.length <= 4
                  ? `-${(100 - 20 * userinfo?.systemSubsystemList.length) / 2}%`
                  : '0px'
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev'
            }}
            slidesPerView={
              userinfo?.systemSubsystemList.length > 5
                ? 5
                : userinfo?.systemSubsystemList.length
            }>
            {/* 联合预警 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 9
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.warnControl +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    {window.sysName.warnControl}
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}
            {/* kj418 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 2
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.waterWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    {window.sysName.waterWatch}
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 水文基础 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 1
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.waterBasic +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    {window.sysName.waterBasic}
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}
            {/* 岩移系统 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 12
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.rockWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.rockWatch}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}
            {/* 微震监测 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 7
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.shakeWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    {window.sysName.shakeWatch}
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}
            {/* 电法监测 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 3
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.eleWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    {window.sysName.eleWatch}
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 水质水源 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 4
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.qa +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    {window.sysName.qa}
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}
            {/* 矿压系统 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 13
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.pressureWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>
                      {window.sysName.pressureWatch}
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}
            <SwiperSlide>
              {/* 大屏 */}
              <div
                className='list'
                onClick={() => {
                  window.open(`/#/frame/report/home-page`, '_blank')
                }}>
                <div className='list-item'>{window.sysName.digitalScreen}</div>
              </div>
            </SwiperSlide>

            {/* 三维建模 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 5
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.threeModel +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.threeModel}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 随掘地震 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 14
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.excQuake +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.excQuake}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 随掘电法 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 15
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.excElectrical +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>
                      {window.sysName.excElectrical}
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 文档子系统 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 10
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.docManage
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.docManage}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {options?.videoSrc ? (
              <SwiperSlide>
                <div
                  className='list'
                  onClick={() => {
                    window.open(options?.videoSrc || '', '_blank')
                  }}>
                  <div className='list-item'>探放水视频</div>
                </div>
              </SwiperSlide>
            ) : null}

            {/* 用户管理 */}
            {userinfo.roleType !== 0 ? (
              <SwiperSlide>
                <div
                  className='list'
                  onClick={() => {
                    const address =
                      'http://' +
                      session.getItem('hostname') +
                      window.sysUrl.sysManage +
                      userinfo.token
                    window.open(address, '_blank')
                  }}>
                  <div className='list-item'>{window.sysName.sysManage}</div>
                </div>
              </SwiperSlide>
            ) : null}
          </Swiper>
        </div>

        {userinfo?.systemSubsystemList.length > 5 ? (
          <img
            className='next'
            src={require('../../assets/image/three/right.png')}
            alt='right-direction'
          />
        ) : null}
      </div>
    </div>
  )

  const App2 = () => (
    <div
      style={{
        ...getStyles(options),
        '--left': options.leftDistance + 'px',
        '--bottom': options.bottomDistance + 'px'
      }}>
      <div className='sys-box-2'>
        {userinfo?.systemSubsystemList.length > 4 ? (
          <img
            src={require('../../assets/image/three/left.png')}
            alt='left-direction'
            className='prev'
          />
        ) : null}

        <div className='center-box direction-scroll'>
          <Swiper
            style={{
              width:
                userinfo?.systemSubsystemList.length >= 4
                  ? '100%'
                  : `${25 * userinfo?.systemSubsystemList.length}%`,
              zIndex: 0,
              position: 'relative',
              left:
                userinfo?.systemSubsystemList.length <= 3
                  ? `-${(100 - 25 * userinfo?.systemSubsystemList.length) / 2}%`
                  : '0px'
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev'
            }}
            slidesPerView={
              userinfo?.systemSubsystemList.length > 4
                ? 4
                : userinfo?.systemSubsystemList.length
            }>
            {/* 联合预警 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 9
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.warnControl +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>
                      {window.sysName.warnControl}
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* kj418 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 2
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.waterWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.waterWatch}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 水文基础 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 1
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.waterBasic +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.waterBasic}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 岩移系统 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 12
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.rockWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.rockWatch}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 微震监测 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 7
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.shakeWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.shakeWatch}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 电法监测 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 3
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.eleWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.eleWatch}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 水质水源 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 4
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.qa +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.qa}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 矿压系统 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 13
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.pressureWatch +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>
                      {window.sysName.pressureWatch}
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 大屏 */}
            <SwiperSlide>
              <div
                className='list'
                onClick={() => {
                  window.open(`/#/frame/report/home-page`, '_blank')
                }}>
                <div className='list-item'>{window.sysName.digitalScreen}</div>
              </div>
            </SwiperSlide>

            {/* 三维建模 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 5
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.threeModel +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.threeModel}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 随掘地震 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 14
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.excQuake +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.excQuake}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 随掘电法 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 15
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.excElectrical +
                        userinfo.token
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>
                      {window.sysName.excElectrical}
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {/* 文档子系统 */}
            {Array.isArray(userinfo?.systemSubsystemList) &&
            userinfo?.systemSubsystemList.length ? (
              userinfo?.systemSubsystemList.find(
                (i: { id: number }) => i.id === 10
              ) ? (
                <SwiperSlide>
                  <div
                    className='list'
                    onClick={() => {
                      const address =
                        'http://' +
                        session.getItem('hostname') +
                        window.sysUrl.docManage
                      window.open(address, '_blank')
                    }}>
                    <div className='list-item'>{window.sysName.docManage}</div>
                  </div>
                </SwiperSlide>
              ) : null
            ) : null}

            {options?.videoSrc ? (
              <SwiperSlide>
                <div
                  className='list'
                  onClick={() => {
                    window.open(options?.videoSrc || '', '_blank')
                  }}>
                  <div className='list-item'>探放水视频</div>
                </div>
              </SwiperSlide>
            ) : null}

            {/* 用户管理 */}
            {userinfo.roleType !== 0 ? (
              <SwiperSlide>
                {' '}
                <div
                  className='list'
                  onClick={() => {
                    const address =
                      'http://' +
                      session.getItem('hostname') +
                      window.sysUrl.sysManage +
                      userinfo.token
                    window.open(address, '_blank')
                  }}>
                  <div className='list-item'>{window.sysName.sysManage}</div>
                </div>
              </SwiperSlide>
            ) : null}
          </Swiper>
        </div>

        {userinfo?.systemSubsystemList.length > 4 ? (
          <img
            src={require('../../assets/image/three/right.png')}
            alt='right-direction'
            className='next'
          />
        ) : null}
      </div>
    </div>
  )

  return (
    <>
      {options.componentType === 'comp1' ? <App1 /> : null}
      {options.componentType === 'comp2' ? <App2 /> : null}
    </>
  )
}

const mapStateToProps = (state: ALL_STATE) => ({
  userinfo: state.userinfo
})

export default connect(mapStateToProps, null)(WidgetSys)

// export default widgetSys
