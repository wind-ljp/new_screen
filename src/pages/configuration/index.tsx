import React, { FC, useEffect, useState, MouseEvent } from 'react'
import { ALL_STATE, IPage, IScreen, IWidget } from '../../store/actionType'
import { connect } from 'react-redux'
import { Slider } from 'antd'
import {
  getLargeScreenPages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage,
  addLargeScreenElement,
  delLargeScreenElement,
  modifyLargeScreenElement,
  copyLargeScreenElement,
  undoLargeScreen,
  redoLargeScreen,
  modifyScreen,
  changeLargeScreenPage,
  changeLargeScreenElement,
  showOrHideLargeScreenElement,
  group,
  cancelGroup,
  topLargescreenElement,
  bottomLargescreenElement,
  upLargescreenElement,
  downLargescreenElement
} from '../../store/actions/largeScreen'

import DesignHeader from './components/header'
import DesignBodyLeft from './components/left'
import DesignBodyRight from './components/right'
import Ruler from './components/ruler'
import DesignBodyCenter from './components/center'
import './index.scss'
import { IAnyObject } from '../../types'

interface IDisignProps {
  modifyScreen: (datas: IScreen) => void
  screen: IScreen
  pages: IPage[]
  addLargeScreenPage: (data: IPage, callback?: Function) => void
  delLargeScreenPage: (id: string, callback?: Function) => void
  modifyLargeScreenPage: (id: string, data: IPage, callback?: Function) => void
  changeLargeScreenPage: (id: string, callback?: Function) => void
  addLargeScreenElement: (data: IWidget, groupId?: string) => void
  modifyLargeScreenElement: (id: string, groupId: string, data: IWidget) => void
  changeLargeScreenElement: (id: string, groupId?: string) => void
  showOrHideLargeScreenElement: (id: string, groupId?: string) => void
  delLargeScreenElement: () => void
  copyLargeScreenElement: () => void
  group: () => void
  cancelGroup: () => void
  currentPage: IPage
  currentWidgetId: string
  currentWidget: IWidget
  pastPage: IPage[]
  futurePage: IPage[]
  undoLargeScreen: () => void
  redoLargeScreen: () => void
  currentWidgetGroupId: string
  topLargescreenElement: () => void
  bottomLargescreenElement: () => void
  upLargescreenElement: () => void
  downLargescreenElement: () => void
  userinfo: IAnyObject
}

const Disign: FC<IDisignProps> = ({
  modifyScreen,
  screen,
  pages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage,
  changeLargeScreenPage,
  addLargeScreenElement,
  currentPage,
  currentWidgetId,
  currentWidget,
  modifyLargeScreenElement,
  pastPage,
  futurePage,
  undoLargeScreen,
  redoLargeScreen,
  changeLargeScreenElement,
  currentWidgetGroupId,
  delLargeScreenElement,
  copyLargeScreenElement,
  group,
  cancelGroup,
  showOrHideLargeScreenElement,
  topLargescreenElement,
  bottomLargescreenElement,
  upLargescreenElement,
  downLargescreenElement,
  userinfo
}) => {
  const [cale, setCale] = useState(0)
  const [leftFlag, setLeftFlag] = useState(false)
  const [rightFlag, setRightFlag] = useState(true)

  useEffect(() => {
    document.title = window.configTitle
  }, [])

  useEffect(() => {
    if (screen.width) {
      setCale(
        Number(
          (
            (Number(document.documentElement.clientWidth) - 600 - 132) /
            Number(document.documentElement.clientWidth)
          ).toFixed(4)
        )
      )
    }
  }, [screen.width])

  const cancelSelectedElementHander = (e: MouseEvent) => {
    if (currentWidgetId) {
      changeLargeScreenElement('')
    }
  }
  return (
    <div className='app-screen-disign'>
      {/* 头部 */}
      <DesignHeader
        undoLargeScreen={undoLargeScreen}
        redoLargeScreen={redoLargeScreen}
        addLargeScreenElement={addLargeScreenElement}
        currentPageId={currentPage.id}
        pastPage={pastPage}
        futurePage={futurePage}
        currentWidgetId={currentWidgetId}
        modifyLargeScreenElement={modifyLargeScreenElement}
        delLargeScreenElement={delLargeScreenElement}
        copyLargeScreenElement={copyLargeScreenElement}
        currentWidgetGroupId={currentWidgetGroupId}
        topLargescreenElement={topLargescreenElement}
        bottomLargescreenElement={bottomLargescreenElement}
        upLargescreenElement={upLargescreenElement}
        downLargescreenElement={downLargescreenElement}
        group={group}
        currentPage={currentPage}
        cancelGroup={cancelGroup}
        currentWidget={currentWidget}
        pages={pages}
        screen={screen}
        changeLargeScreenElement={changeLargeScreenElement}
        modifyLargeScreenPage={modifyLargeScreenPage}
      />
      {/* 内容区 */}
      <div className='app-screen-disign__body'>
        {/* 左边 */}
        <DesignBodyLeft
          setLeftFlag={setLeftFlag}
          leftFlag={leftFlag}
          pages={pages}
          addLargeScreenPage={addLargeScreenPage}
          delLargeScreenPage={delLargeScreenPage}
          modifyLargeScreenPage={modifyLargeScreenPage}
          currentPageId={currentPage.id}
          changeLargeScreenPage={changeLargeScreenPage}
          addLargeScreenElement={addLargeScreenElement}
          currentWidgetGroupId={currentWidgetGroupId}
        />
        <div
          style={{
            paddingLeft: leftFlag ? 200 : 0,
            paddingRight: rightFlag && pages.length ? 400 : 0
          }}
          className='app-screen-disign__body--center'>
          <div className='body' id='js-elements-body'>
            <div className='elements-wrap'>
              <Ruler cale={cale} />
              <div
                onClick={cancelSelectedElementHander}
                className='elements-wrap-canvas'
                style={{
                  overflow: 'hidden',
                  position: 'absolute',
                  zIndex: 1,
                  left: 66,
                  top: 66,
                  width: screen.width,
                  height: screen.height,
                  transform: `scale(${cale})`,
                  transformOrigin: '0 0',
                  background: `url(${screen.backgroundImage}) no-repeat ${screen.backgroundColor}  0% 0% / 100% 100%`
                }}>
                <DesignBodyCenter
                  currentPage={currentPage}
                  currentWidgetId={currentWidgetId}
                  cale={cale}
                  screen={screen}
                  currentWidgetGroupId={currentWidgetGroupId}
                  changeLargeScreenElement={changeLargeScreenElement}
                  currentWidget={currentWidget}
                  modifyLargeScreenElement={modifyLargeScreenElement}
                />
              </div>
            </div>
          </div>
          <div className='footer'>
            <span>缩放比例：</span>
            <Slider
              style={{
                width: 300
              }}
              min={5}
              max={100}
              // tipFormatter={(value) => `${value}%`}
              tooltip={{ formatter: (value) => `${value}%` }}
              onChange={(value) => setCale(value / 100)}
              value={cale * 100}
            />
          </div>
        </div>
        {/* 右边 */}
        {pages.length ? (
          <DesignBodyRight
            rightFlag={rightFlag}
            setRightFlag={setRightFlag}
            screen={screen}
            currentPage={currentPage}
            modifyLargeScreenElement={modifyLargeScreenElement}
            modifyScreen={modifyScreen}
            currentWidget={currentWidget}
            showOrHideLargeScreenElement={showOrHideLargeScreenElement}
            changeLargeScreenElement={changeLargeScreenElement}
            currentWidgetGroupId={currentWidgetGroupId}
            currentWidgetId={currentWidgetId}
            userinfo={userinfo}
          />
        ) : null}
      </div>
    </div>
  )
}

const mapStateToProps = (state: ALL_STATE) => {
  return {
    pages: state.largeScreen.pages,
    pastPage: state.largeScreen.pastPage,
    futurePage: state.largeScreen.futurePage,
    currentPage: state.largeScreen.currentPage,
    currentWidgetId: state.largeScreen.currentWidgetId,
    screen: state.largeScreen.screen,
    currentWidget: state.largeScreen.currentWidget,
    currentWidgetGroupId: state.largeScreen.currentWidgetGroupId,
    userinfo: state.userinfo
  }
}

const mapDispatchToProps = {
  getLargeScreenPages,
  addLargeScreenPage,
  delLargeScreenPage,
  modifyLargeScreenPage,
  addLargeScreenElement,
  delLargeScreenElement,
  modifyLargeScreenElement,
  undoLargeScreen,
  redoLargeScreen,
  modifyScreen,
  changeLargeScreenPage,
  changeLargeScreenElement,
  copyLargeScreenElement,
  group,
  cancelGroup,
  showOrHideLargeScreenElement,
  topLargescreenElement,
  bottomLargescreenElement,
  upLargescreenElement,
  downLargescreenElement
}

export default connect(mapStateToProps, mapDispatchToProps)(Disign)
