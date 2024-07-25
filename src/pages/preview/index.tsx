/*
 * @Description: 预览
 * @Author: liaojp
 * @Date: 2022-08-26 21:26:44
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:32:12
 * @FilePath: \配置大屏\src\pages\preview\index.tsx
 * Copyright (c) 2022 by  liaojp  , All Rights Reserved.
 */
import useUrlState from '@ahooksjs/use-url-state'
import Request from '../../components/request'
import Map from '../../pages/cmap'
import ThreeModel from '../../pages/three'
import { getScreenById, previewPost } from '../../service/screen'
import components from '../../widget'
import { ALL_STATE, IPage, IScreen, IWidget } from '../../store/actionType'
import {
  changePreviewPage,
  modifyLargeScreenElement
} from '../../store/actions/largeScreen'
import { getStyles } from '../../utils/tools'
import { useUpdateEffect } from 'ahooks'
import anime from 'animejs'
import { Spin, message } from 'antd'
import { FC, Ref, useEffect, useRef, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './index.scss'
import { startNextPoll, stopPoll } from './interval'
// import Tool from './tool'

interface IPreviewProps {
  currentPage: IPage
  screen: IScreen
  modifyLargeScreenElement: (id: string, groupId: string, data: IWidget) => void
  changePreviewPage: (id: any, screen: any, pages: any) => void
}

const Preview: FC<IPreviewProps> = ({
  currentPage,
  screen,
  modifyLargeScreenElement,
  changePreviewPage
}) => {
  const infoRef = useRef(0)
  const history = useHistory()
  const ChildThreeRef: Ref<any> = useRef()
  const elementsWrapper = useRef<HTMLDivElement>(null)
  const [cale, setCale] = useState(0) // 获取放大缩小比例
  const [elementsWrapperAttr, setElementsWrapperAttr] = useState<any>({})
  const [full, setFull] = useState(false)
  const handle = useFullScreenHandle() // fullScreen的handle
  const [locationState] = useUrlState()
  const [loading, setLoading] = useState<boolean>(false)
  const [screenMsg, setScreenMsg] = useState<any>({})
  const [localPage, setLocalPage] = useState<IPage>(currentPage)
  useEffect(() => {
    document.title = window.previewTitle
  }, [])

  useEffect(() => {
    if (locationState.id) {
      getScreenById(locationState.id).then((res) => {
        if (res.data) {
          changePreviewPage(res.data.screen.id, res.data.pages, res.data.screen)
          setScreenMsg(res.data.screen)
        }
      })
    }
    if (locationState.pageId) {
      setScreenMsg(screen)
    }
    if (!locationState.id && !locationState.pageId) {
      previewPost().then((res) => {
        if (res.data) {
          changePreviewPage(res.data.screen.id, res.data.pages, res.data.screen)
          setScreenMsg(res.data.screen)
        } else {
          history.replace('/frame/report/home-page')
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useUpdateEffect(() => {
    setLocalPage(currentPage)
  }, [currentPage])

  const getNewScreen = (id: any) => {
    getScreenById(id).then((res: any) => {
      if (res.code === 200) {
        setLocalPage(res.data.pages[0])
      } else {
        message.error(res.msg)
      }
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: { keyCode: number }) => {
      let newIndex: number
      if (e.keyCode === 38) {
        // 上下键对应的 keyCode 分别为 38 和 40
        if (screenMsg.turnList) {
          if (infoRef.current > 0) {
            newIndex = infoRef.current - 1
          } else {
            newIndex = JSON.parse(screenMsg.turnList).list.length - 1 // 如果已经到达第一个元素，则将索引设置为最后一个元素
          }
          infoRef.current = newIndex
          getNewScreen(JSON.parse(screenMsg.turnList).list.reverse()[newIndex])
        }
      } else if (e.keyCode === 40) {
        if (screenMsg.turnList) {
          if (
            infoRef.current <
            JSON.parse(screenMsg.turnList).list.length - 1
          ) {
            newIndex = infoRef.current + 1
          } else {
            newIndex = 0 // 如果已经到达第一个元素，则将索引设置为最后一个元素
          }
          infoRef.current = newIndex
          getNewScreen(JSON.parse(screenMsg.turnList).list.reverse()[newIndex])
        }
      }
    }
    if (screenMsg.turnList) {
      if (JSON.parse(screenMsg.turnList).handle == false) {
        if (
          Array.isArray(JSON.parse(screenMsg.turnList).list) &&
          JSON.parse(screenMsg.turnList).list.length &&
          JSON.parse(screenMsg.turnList).time
        ) {
          startNextPoll(
            JSON.parse(screenMsg.turnList).list,
            JSON.parse(screenMsg.turnList).time,
            getNewScreen
          )
        }
      } else {
        document.addEventListener('keydown', handleKeyDown)
      }
    }
    return () => {
      document.addEventListener('keydown', handleKeyDown)
    }
  }, [screenMsg.turnList])

  // 获取elementsWrapper的宽度
  useEffect(() => {
    const resizeHander = () => {
      if (elementsWrapper.current) {
        //   setElementsWrapperAttr({
        //     width: elementsWrapper.current?.offsetWidth
        //   })
        setCale(
          document.documentElement.clientHeight / Number(screenMsg.height)
        )
      }
    }
    resizeHander()
    window.addEventListener('resize', resizeHander)
    return () => {
      window.removeEventListener('resize', resizeHander)
    }
  }, [screenMsg.height])

  useEffect(() => {
    if (screenMsg.dimension === '3D') {
      setLoading(true)
    }
  }, [screenMsg.dimension])

  const loadDone = () => {
    setLoading(false)
  }

  const toFullScreen = () => {
    if (full) {
      return
    }
    setCale(1)
    setFull(true)
    handle.enter()
  }

  /**
   * 切换面板
   * @param key
   * 1. 模型
   * 2. 模型 + 统计面板
   * 3. 模型 + 资源面板
   */
  const toggleChart = (key: string) => {
    if (key === '1') {
      anime({
        targets: '.app-widget__item',
        scale: 0,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      anime({
        targets: '#nodeContainerId',
        scale: 0,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      anime({
        targets: '#nodeContainerSensorId',
        scale: 0,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      const a = Array.from(
        document.getElementsByClassName('app-widget__item')
      ).filter((item) => {
        return item.getElementsByClassName('Other').length
      })
      anime({
        targets: a,
        scale: 1,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      if (
        Array.isArray(JSON.parse(screenMsg.turnList)?.list) &&
        JSON.parse(screenMsg.turnList)?.list.length &&
        JSON.parse(screenMsg.turnList)?.time
      ) {
        stopPoll() // 停止轮询
      }
    }

    if (key === '2') {
      anime({
        targets: '.app-widget__item',
        scale: 1,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      anime({
        targets: '#nodeContainerId',
        scale: 0,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      anime({
        targets: '#nodeContainerSensorId',
        scale: 0,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      if (screenMsg.turnList) {
        if (
          Array.isArray(JSON.parse(screenMsg.turnList)?.list) &&
          JSON.parse(screenMsg.turnList)?.list.length &&
          JSON.parse(screenMsg.turnList)?.time
        ) {
          // 恢复轮询
          startNextPoll(
            JSON.parse(screenMsg.turnList).list,
            JSON.parse(screenMsg.turnList).time,
            getNewScreen
          )
        }
      }
    }

    if (key === '3') {
      const a = Array.from(document.getElementsByClassName('app-widget__item'))
        .filter((item) => item.id)
        .filter((item) => {
          const temp: any = item
          return temp.title === 'is-head'
        })
      const b = a.length
        ? a[0]
            .getElementsByClassName('app-element__group')[0]
            .getElementsByClassName('app-widget__item')
        : []
      const c = b.length
        ? Array.from(
            document.getElementsByClassName('app-widget__item')
          ).filter((i) => Array.from(b).every((j) => j !== i))
        : []
      const d = c.length
        ? c
            .filter((item) => item.id)
            .filter((item) => {
              const temp: any = item
              return temp.title === 'is-head'
            })
        : []
      const e = d.length ? c.filter((i) => d.every((j) => j !== i)) : []
      anime({
        targets: '.app-widget__item',
        scale: 1,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      anime({
        targets: e.length ? e : '.app-widget__item',
        scale: 0,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      anime({
        targets: '#nodeContainerId',
        scale: 1,
        duration: 200,
        easing: 'easeInOutQuad'
      })
      if (
        Array.isArray(JSON.parse(screenMsg.turnList)?.list) &&
        JSON.parse(screenMsg.turnList)?.list.length &&
        JSON.parse(screenMsg.turnList)?.time
      ) {
        stopPoll() // 停止轮询
      }
    }
  }

  const renderWidgets = (
    widgets: IWidget[],
    groupConfig?: any,
    group?: IWidget
  ) => {
    return (
      <>
        {/* eslint-disable-next-line array-callback-return */}
        {widgets.map((item: any, index: number) => {
          if (item.widgets) {
            const Widget = components[item.code] || components[item.type]
            if (Widget) {
              let params = {}
              for (let i = 0; i < localPage.widgets.length; i++) {
                // 联动
                if (localPage.widgets[i].linkageIds.includes(item.id)) {
                  params = {
                    ...params,
                    ...localPage.widgets[i].dataValue.params
                  }
                }
              }
              return (
                <div
                  key={item.id}
                  id={`app-widget__item${item.id}`}
                  className='app-widget__item'
                  title={item.configureValue.isScreenHead ? 'is-head' : ''}
                  style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: item.coordinateValue.width,
                    height: item.coordinateValue.height,
                    left: item.coordinateValue.left,
                    top: item.coordinateValue.top,
                    ...getStyles({
                      ...item.configureValue,
                      ...item.coordinateValue
                    }),
                    borderStyle: 'none !important',
                    boxShadow: 'none !important'
                  }}>
                  <Request
                    isPlaceholder={true}
                    method={item.dataValue.method}
                    url={item.dataValue.url}
                    params={JSON.stringify(
                      {
                        ...item.dataValue.params,
                        ...params
                      } || {}
                    )}
                    render={(data, success) => {
                      return (
                        <Widget
                          options={{
                            ...item.coordinateValue,
                            groupBorderType:
                              item.configureValue.groupBorderType,
                            onlyKey: item.id,
                            showWidgetStatus:
                              item.configureValue?.showWidgetStatus,
                            showIconAddress:
                              item.configureValue?.showIconAddress,
                            iconHeight: item.configureValue?.iconHeight,
                            iconWidth: item.configureValue?.iconWidth,
                            showIconPosition:
                              item.configureValue?.showIconPosition,
                            screen,
                            dataValue: item.dataValue
                          }}>
                          {renderWidgets(
                            item.widgets,
                            {
                              ...item,
                              dataValue: {
                                ...item.dataValue,
                                mock: item.dataValue.useInterface
                                  ? data
                                  : item.dataValue.mock
                              },
                              success,
                              parentParams: {
                                ...item.dataValue.params,
                                ...params
                              }
                            },
                            item
                          )}
                        </Widget>
                      )
                    }}></Request>
                </div>
              )
            }
          } else {
            const Widget = components[item.code] || components[item.type]
            if (Widget) {
              let params = {}
              for (let i = 0; i < localPage.widgets.length; i++) {
                if (localPage.widgets[i].linkageIds.includes(item.id)) {
                  params = {
                    ...params,
                    ...localPage.widgets[i].dataValue.params
                  }
                }
              }
              return (
                <div
                  key={item.id}
                  className='app-widget__item'
                  style={{
                    position: 'absolute',
                    width: item.coordinateValue.width,
                    height: item.coordinateValue.height,
                    left: item.coordinateValue.left,
                    top: item.coordinateValue.top
                  }}>
                  <Request
                    isPlaceholder={true}
                    method={
                      item.dataValue.useInterface ? '' : item.dataValue.method
                    }
                    url={
                      item.dataValue.useInterface
                        ? ''
                        : groupConfig && groupConfig.dataValue.useInterface
                        ? groupConfig.success
                          ? item.dataValue.url
                          : ''
                        : item.dataValue.url
                    }
                    params={JSON.stringify(
                      Object.assign(
                        { ...item.dataValue.params },
                        groupConfig && groupConfig.parentParams
                          ? groupConfig.parentParams
                          : {},
                        params
                      ) || {}
                    )}
                    render={(data, success) => {
                      let datas: any = null
                      if (
                        item.dataValue.useInterface &&
                        groupConfig &&
                        groupConfig.dataValue
                      ) {
                        datas = groupConfig.dataValue.mock
                      } else {
                        datas =
                          item.dataValue.dataType === 'mock'
                            ? item.dataValue.mock
                            : success
                            ? data
                            : null
                      }
                      return (
                        <Widget
                          modifyLargeScreenElement={modifyLargeScreenElement}
                          parentWidget={group}
                          paramName={item.dataValue.paramName}
                          paramValue={
                            groupConfig &&
                            groupConfig.parentParams &&
                            item.dataValue.paramName
                              ? groupConfig.parentParams[
                                  item.dataValue.paramName
                                ]
                              : ''
                          }
                          className={`${item.configureValue.animateName}`}
                          field={item.dataValue.field}
                          data={datas}
                          options={{
                            ...item.configureValue,
                            ...item.coordinateValue,
                            dataValue: item.dataValue
                          }}
                          toFullScreen={toFullScreen}
                          toggleChart={toggleChart}
                        />
                      )
                    }}></Request>
                </div>
              )
            }
          }
        })}
      </>
    )
  }

  return (
    <FullScreen handle={handle} onChange={setFull}>
      <div
        id='full-screen-container'
        className='app-preview'
        ref={elementsWrapper}
        style={{
          background: `url(${screenMsg.backgroundImage}) no-repeat ${screenMsg.backgroundColor}  0% 0% / 100% 100%`
        }}>
        <div
          className='app-preview__container'
          style={{
            width: screenMsg.width,
            height: screenMsg.height,
            transform: `scale(${
              (document.documentElement.clientWidth ||
                document.body.clientWidth) / Number(screenMsg.width)
            }, ${cale})`,
            transformOrigin: '0 0',
            position: 'relative'
          }}>
          {screenMsg?.dimension === '2D' ? (
            <Map isConfig={false} screen={screenMsg} />
          ) : null}
          {localPage && localPage.widgets
            ? renderWidgets(localPage.widgets)
            : null}
          {screenMsg?.dimension === '3D' ? (
            <>
              <Spin spinning={loading} tip='模型渲染中，请耐心等待！' />
              <ThreeModel
                loadDone={loadDone}
                onRef={ChildThreeRef}
                showControl={true}
                screen={screenMsg}
                cale={cale}
                toFullScreen={toFullScreen}
                toggleChart={toggleChart}
              />
            </>
          ) : null}
          {/* <Tool toFullScreen={toFullScreen} toggleChart={toggleChart} dimension={screenMsg?.dimension} /> */}
        </div>
      </div>
    </FullScreen>
  )
}

const mapStateToProps = (state: ALL_STATE) => {
  return {
    currentPage: state.largeScreen.currentPage,
    screen: state.largeScreen.screen
  }
}

const mapDispatchToProps = {
  modifyLargeScreenElement,
  changePreviewPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
