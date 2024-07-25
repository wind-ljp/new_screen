import { FC, MouseEvent, useEffect } from 'react'
import { IPage, IWidget, IScreen } from '../../../../store/actionType'
import { contentMenuHandler } from '../../../../utils/tools'
// 所有组件地址
import components from '../../../../widget'
// 接口
import Request from '../../../../components/request'
// 拖动组件
import Drag from './components/drag'
// 屏幕辅助线
import Auxiliary from './components/auxiliary'
import { IAnyObject } from '../../../../types'

interface IDesignBodyCenterProps {
  currentPage: IPage
  currentWidgetId: string
  currentWidget: IWidget
  cale: number
  modifyLargeScreenElement: (id: string, groupId: string, data: IWidget) => void
  changeLargeScreenElement: (id: string, groupId?: string) => void
  screen: IScreen
  currentWidgetGroupId: string
}

const DesignBodyCenter: FC<IDesignBodyCenterProps> = ({
  currentPage,
  currentWidgetId,
  modifyLargeScreenElement,
  changeLargeScreenElement,
  currentWidget,
  cale,
  screen,
  currentWidgetGroupId
}) => {
  // 隐藏菜单
  const hideContentMenu = () => {
    document
      .querySelector('#js-content-menu')
      ?.setAttribute('style', 'display: none')
  }
  // 组组件单击时触发
  const groupWidgetClickHander = (e: MouseEvent, item: IWidget) => {
    e.preventDefault()
    e.stopPropagation()
    hideContentMenu()
    if (item.id !== currentWidgetId) {
      changeLargeScreenElement(item.id, item.id)
    }
  }
  //非组组件单击时触发
  const widgetClickHander = (
    e: MouseEvent,
    item: IWidget,
    groupConfig?: IAnyObject
  ) => {
    e.preventDefault()
    e.stopPropagation()
    hideContentMenu()
    if (item.id !== currentWidgetId) {
      if (e.ctrlKey && !groupConfig && !currentWidgetGroupId) {
        changeLargeScreenElement(
          currentWidgetId ? `${currentWidgetId},${item.id}` : item.id
        )
      } else {
        changeLargeScreenElement(item.id, groupConfig?.id)
      }
    }
  }

  useEffect(() => {
    const clickHander = () => {
      hideContentMenu()
    }
    const wrap = document.querySelector('#js-elements-body')
    window.addEventListener('click', clickHander)
    window.addEventListener('contextmenu', clickHander)
    wrap?.addEventListener('scroll', clickHander)
    return () => {
      window.removeEventListener('click', clickHander)
      window.removeEventListener('contextmenu', clickHander)
      wrap?.removeEventListener('scroll', clickHander)
    }
  }, [])
  // 渲染组件
  const renderWidgets = (
    widgets: IWidget[],
    groupConfig?: IAnyObject,
    group?: IWidget
  ) => {
    return (
      <>
        {/* eslint-disable-next-line array-callback-return */}
        {widgets.map((item: any) => {
          // 说明有group组件
          if (item.widgets) {
            const Widget = components[item.code] || components[item.type]
            if (Widget) {
              let params = {}
              for (let i = 0; i < currentPage.widgets.length; i++) {
                if (currentPage.widgets[i].linkageIds.includes(item.id)) {
                  params = {
                    ...params,
                    ...currentPage.widgets[i].dataValue.params
                  }
                }
              }
              return (
                <Drag
                  item={item}
                  currentWidgetId={currentWidgetId}
                  currentWidgetGroupId={currentWidgetGroupId}
                  currentWidget={currentWidget}
                  cale={cale}
                  modifyLargeScreenElement={modifyLargeScreenElement}
                  key={item.id}
                  className='react-draggable-group'>
                  <div
                    onContextMenu={(e) => {
                      groupWidgetClickHander(e, item)
                      contentMenuHandler(e)
                    }}
                    onClick={(e: MouseEvent) => groupWidgetClickHander(e, item)}
                    className={`app-widget__item ${
                      currentWidgetId.includes(item.id) ? 'is-active' : ''
                    }`}>
                    <div className='mask'>
                      {/* 辅助线 */}
                      <div className='line-top'></div>
                      <div className='line-left'></div>
                      {/* 坐标值 */}
                      <div className='label'>
                        {item.coordinateValue.left},{item.coordinateValue.top}
                      </div>
                    </div>
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
                          <>
                            <Widget
                              options={{
                                ...item.configureValue,
                                ...item.coordinateValue,
                                dataValue: item.dataValue
                              }}
                              className={
                                item.id === currentWidgetGroupId
                                  ? 'is-active'
                                  : ''
                              }>
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
                          </>
                        )
                      }}></Request>
                  </div>
                </Drag>
              )
            }
          } else {
            // 没有group组件
            const Widget = components[item.code] || components[item.type]
            if (Widget) {
              let params = {}
              for (let i = 0; i < currentPage.widgets.length; i++) {
                if (currentPage.widgets[i].linkageIds.includes(item.id)) {
                  params = {
                    ...params,
                    ...currentPage.widgets[i].dataValue.params
                  }
                }
              }
              return (
                <Drag
                  item={item}
                  currentWidgetGroupId={currentWidgetGroupId}
                  currentWidgetId={currentWidgetId}
                  currentWidget={currentWidget}
                  cale={cale}
                  modifyLargeScreenElement={modifyLargeScreenElement}
                  key={item.id}
                  className=''>
                  <div
                    onContextMenu={(e) => {
                      contentMenuHandler(e)
                      widgetClickHander(e, item, groupConfig)
                    }}
                    onClick={(e) => widgetClickHander(e, item, groupConfig)}
                    className={`app-widget__item ${
                      currentWidgetId.includes(item.id) ? 'is-active' : ''
                    }`}>
                    <div className='mask'>
                      {/* 辅助线 */}
                      <div className='line-top'></div>
                      <div className='line-left'></div>
                      {/* 坐标值 */}
                      <div className='label'>
                        {item.coordinateValue.left},{item.coordinateValue.top}
                      </div>
                    </div>
                    <Request
                      isPlaceholder={true}
                      method={
                        item.dataValue.useInterface ? '' : item.dataValue.method
                      }
                      url={
                        item.dataValue.useInterface
                          ? ''
                          : groupConfig &&
                            groupConfig.dataValue &&
                            groupConfig.dataValue.useInterface
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
                        // 确定数据
                        let datas = null
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
                          <>
                            <Widget
                              modifyLargeScreenElement={
                                modifyLargeScreenElement
                              }
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
                            />
                          </>
                        )
                      }}></Request>
                  </div>
                </Drag>
              )
            }
          }
        })}
      </>
    )
  }
  return (
    <>
      {/* <Grid screen={screen} /> */}
      <Auxiliary screen={screen} />
      {currentPage && currentPage.widgets
        ? renderWidgets(currentPage.widgets)
        : null}
      {/* {screen?.dimension === '2D' ? <Map isConfig={true} screen={screen} /> : null} */}
      {/* {screen?.dimension === '3D' ? <ThreeModel screen={screen} /> : null} */}
    </>
  )
}

export default DesignBodyCenter
