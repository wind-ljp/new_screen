/*
 * @Author: liaojingping
 * @Date: 2023-03-10 13:32:13
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:39:24
 * @FilePath: \配置大屏\src\pages\three\components\nodelist\index.tsx
 * @Description: 模型资源栏
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { FC, useState } from 'react'
import { Collapse, Col, Pagination } from 'antd'
import togglePng from '../../../../assets/image/three/toggle_source.png'
import PanelArrowPng from '../../../../assets/image/three/panel-arrow.png'
import PanelArrowPng2 from '../../../../assets/image/three/panel-arrow-2.png'
import AnglePng from '../../../../assets/image/three/angle.png'
import showPng from '../../../../assets/image/three/visible.png'
import hidePng from '../../../../assets/image/three/unvisible.png'
import anime from 'animejs'
import './index.scss'
import { useUpdateEffect } from 'ahooks'

const { Panel } = Collapse

interface Source {
  modelList: any[]
  setModelVisible: (argus1: string | number, argus2: boolean) => void
  getModelByName: (argus: string) => any
}

const NodeList: FC<Source> = ({
  modelList,
  setModelVisible,
  getModelByName
}) => {
  const [page, setPage] = useState<number>(1)
  const [modelArrList, setModelArrList] = useState<any[]>([])

  const changePage = (page: number) => {
    setPage(page)
  }

  useUpdateEffect(() => {
    const temp = modelList
    temp.forEach((i) => {
      i.modelList.forEach((item: any) => {
        item.visible = true
        item.modelTypeName = i.modelTypeName
      })
    })
    setModelArrList(temp)
    // if (modelList[0].modelType == 2) {
    //   getModelByName(String(modelList[0].modelList[0].id)) // 定位
    // }
  }, [modelList.length])

  const changeData = (arr: any[], mountOfEachLine = 10) => {
    let newArr = []
    let len = arr.length
    let lineNum =
      len % mountOfEachLine === 0
        ? len / mountOfEachLine
        : Math.ceil(len / mountOfEachLine)
    for (let i = 0; i < lineNum; i++) {
      let tempElement = arr.slice(
        i * mountOfEachLine,
        (i + 1) * mountOfEachLine
      )
      newArr.push(tempElement)
    }
    return newArr[page - 1]
  }

  const formatName = (code: string) => {
    let dictList: any = localStorage.getItem('dictList')
    let temp = JSON.parse(dictList)
    return temp.find((i: { code: string }) => i.code === code)?.value || code
  }

  return modelList.length ? (
    modelList[0].modelType === 2 ? (
      <div className='nodeContainer' id='nodeContainerId'>
        <div className='title'>
          <span className='typeName'>模型</span>
          <img
            src={togglePng}
            alt='toggle'
            title='切换'
            onClick={() => {
              anime({
                targets: '#nodeContainerId',
                scale: 0,
                duration: 200,
                easing: 'easeInOutQuad'
              })
              anime({
                targets: '#nodeContainerSensorId',
                scale: 1,
                duration: 200,
                easing: 'easeInOutQuad'
              })
            }}
          />
        </div>
        <div className='body'>
          <Collapse
            key='1'
            ghost
            accordion
            expandIcon={({ isActive }) => (
              <img
                src={isActive ? PanelArrowPng : PanelArrowPng2}
                alt='arrow'
              />
            )}
            expandIconPosition='end'
            className='site-collapse-custom-collapse'
            onChange={() => setPage(1)}>
            {modelArrList.length
              ? modelArrList.map((item, index) => (
                  <Panel
                    header={item.modelTypeName}
                    key={index}
                    className='site-collapse-custom-panel'>
                    {Array.isArray(item.modelList)
                      ? item.modelList.length
                        ? item.modelList.map((item: any) => (
                            <Col key={'Model' + item.id} className='col'>
                              <span
                                className='label'
                                onClick={() => {
                                  console.log(
                                    window.Tmodel.scene.getObjectByName(item.id)
                                  )
                                }}>
                                {item.objectName}：{formatName(item.modelName)}
                              </span>
                              <img
                                title='移动至模型视角'
                                style={{
                                  position: 'absolute',
                                  right: '34px',
                                  width: '24px',
                                  cursor: 'pointer'
                                }}
                                src={AnglePng}
                                alt=''
                                onClick={() => getModelByName(String(item.id))}
                              />
                              <img
                                title='显示/隐藏模型'
                                style={{
                                  position: 'absolute',
                                  right: '0px',
                                  width: '24px',
                                  cursor: 'pointer'
                                }}
                                id={item.id}
                                src={
                                  window.Tmodel.scene.getObjectByName(item.id)
                                    .visible
                                    ? showPng
                                    : hidePng
                                }
                                alt={String(item.visible)}
                                onClick={() => {
                                  console.log()
                                  const tempArr = modelArrList
                                  const index = modelArrList.findIndex(
                                    (i) =>
                                      i.modelTypeName === item.modelTypeName
                                  )
                                  tempArr[index].modelList.forEach((i: any) => {
                                    i.visible = !item.visible
                                  })
                                  setModelArrList(tempArr)
                                  let node: any = document.getElementById(
                                    item.id
                                  )
                                  if (node.alt === 'true') {
                                    node.src = hidePng
                                    node.alt = 'false'
                                  } else {
                                    node.src = showPng
                                    node.alt = 'true'
                                  }
                                  setModelVisible(
                                    String(item.id),
                                    node.alt === 'true'
                                  )
                                }}
                              />
                            </Col>
                          ))
                        : null
                      : null}
                  </Panel>
                ))
              : null}
          </Collapse>
        </div>
      </div>
    ) : (
      <div className='nodeContainer' id='nodeContainerId'>
        <div className='title'>
          <span className='typeName'>模型</span>
          <img
            src={togglePng}
            alt='toggle'
            title='切换'
            onClick={() => {
              anime({
                targets: '#nodeContainerId',
                scale: 0,
                duration: 200,
                easing: 'easeInOutQuad'
              })
              anime({
                targets: '#nodeContainerSensorId',
                scale: 1,
                duration: 200,
                easing: 'easeInOutQuad'
              })
            }}
          />
        </div>
        <div className='body'>
          <Collapse
            key='1'
            ghost
            accordion
            expandIcon={({ isActive }) => (
              <img
                src={isActive ? PanelArrowPng : PanelArrowPng2}
                alt='arrow'
              />
            )}
            expandIconPosition='end'
            className='site-collapse-custom-collapse'
            onChange={() => setPage(1)}>
            {modelArrList.length
              ? modelArrList.map((item, index) => (
                  <Panel
                    header={item.modelTypeName}
                    key={index}
                    className='site-collapse-custom-panel'>
                    {Array.isArray(changeData(item.modelList))
                      ? changeData(item.modelList).length
                        ? changeData(item.modelList).map((item: any) => (
                            <Col key={'Model' + item.id} className='col'>
                              <span
                                className='label'
                                onClick={() => console.log(item.id)}>
                                {item.objectName}：{item.modelName}
                              </span>
                              <img
                                title='移动至模型视角'
                                style={{
                                  position: 'absolute',
                                  right: '34px',
                                  width: '24px',
                                  cursor: 'pointer'
                                }}
                                src={AnglePng}
                                alt=''
                                onClick={() => getModelByName(String(item.id))}
                              />
                              <img
                                title='显示/隐藏模型'
                                style={{
                                  position: 'absolute',
                                  right: '0px',
                                  width: '24px',
                                  cursor: 'pointer'
                                }}
                                id={item.id}
                                src={
                                  // TODOo 暂时处理，modelType为非2时经过弹窗后需要多点击一次
                                  window.Tmodel?.scene?.getObjectByName(item.id)
                                    ?.visible
                                    ? hidePng
                                    : showPng
                                }
                                alt={String(item.visible)}
                                onClick={() => {
                                  const tempArr = modelArrList
                                  const index = modelArrList.findIndex(
                                    (i) =>
                                      i.modelTypeName === item.modelTypeName
                                  )
                                  tempArr[index].modelList.forEach((i: any) => {
                                    i.visible = !item.visible
                                  })
                                  setModelArrList(tempArr)
                                  let node: any = document.getElementById(
                                    item.id
                                  )
                                  if (node.alt === 'true') {
                                    node.src = hidePng
                                    node.alt = 'false'
                                  } else {
                                    node.src = showPng
                                    node.alt = 'true'
                                  }
                                  setModelVisible(
                                    String(item.id),
                                    node.alt === 'true'
                                  )
                                }}
                              />
                            </Col>
                          ))
                        : null
                      : null}

                    <Pagination
                      style={{ marginTop: '15px', textAlign: 'center' }}
                      simple
                      defaultCurrent={1}
                      defaultPageSize={10}
                      total={item.modelList.length}
                      onChange={(e) => changePage(e)}
                      current={page}
                    />
                  </Panel>
                ))
              : null}
          </Collapse>
        </div>
      </div>
    )
  ) : null
}

export default NodeList
