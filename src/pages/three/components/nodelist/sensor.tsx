/*
 * @Author: liaojingping
 * @Date: 2023-03-10 13:32:13
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:39:59
 * @FilePath: \配置大屏\src\pages\three\components\nodelist\sensor.tsx
 * @Description: 传感器资源栏
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { FC, useState } from 'react'
import { Collapse, Checkbox, Col, Pagination } from 'antd'
import togglePng from '../../../../assets/image/three/toggle_source.png'
import PanelArrowPng from '../../../../assets/image/three/panel-arrow.png'
import PanelArrowPng2 from '../../../../assets/image/three/panel-arrow-2.png'
import { IAnyObject } from '../../../../types'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import anime from 'animejs'
import './sensor.scss'

const { Panel } = Collapse

interface Source {
  sensorList: IAnyObject
  setModelVisible: (argus1: string | number, argus2: boolean) => void
}

const NodeList: FC<Source> = ({ sensorList, setModelVisible }) => {
  const [page, setPage] = useState<number>(1)

  const onChange = (e: CheckboxChangeEvent & any) => {
    // setModelVisible(e.target.value, e.target.checked)
  }

  const changePage = (page: number) => {
    setPage(page)
  }

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

  return (
    <div className='nodeContainer' id='nodeContainerSensorId'>
      <div className='title'>
        <span className='typeName'>传感器</span>
        <img
          src={togglePng}
          alt='toggle'
          title='切换'
          onClick={() => {
            anime({
              targets: '#nodeContainerId',
              scale: 1,
              duration: 200,
              easing: 'easeInOutQuad'
            })
            anime({
              targets: '#nodeContainerSensorId',
              scale: 0,
              duration: 200,
              easing: 'easeInOutQuad'
            })
          }}
        />
      </div>
      <div className='body'>
        {Object.keys(sensorList).length ? (
          <Collapse
            key='2'
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
            {Object.keys(sensorList).map((item, index) => (
              <Panel
                header={item}
                key={index}
                className='site-collapse-custom-panel'>
                {Array.isArray(changeData(sensorList[item])) ? (
                  <>
                    <Checkbox.Group
                      defaultValue={sensorList[item].map(
                        (i: any) => i.id + ';' + i.typeId
                      )}>
                      {changeData(sensorList[item])
                        ? changeData(sensorList[item]).map(
                            (item: {
                              id: string
                              name: string
                              typeId: number
                            }) => (
                              <Col key={item.id} className='col'>
                                <Checkbox
                                  disabled
                                  onChange={onChange}
                                  value={item.id + ';' + item.typeId}
                                />
                                <span
                                  className='label'
                                  onClick={() => console.log(item.id)}>
                                  {item.name}
                                </span>
                              </Col>
                            )
                          )
                        : null}
                    </Checkbox.Group>
                    <Pagination
                      style={{ marginTop: '15px', textAlign: 'center' }}
                      simple
                      defaultCurrent={1}
                      defaultPageSize={10}
                      total={sensorList[item].length}
                      onChange={(e) => changePage(e)}
                      current={page}
                    />
                  </>
                ) : null}
              </Panel>
            ))}
          </Collapse>
        ) : null}
      </div>
    </div>
  )
}

export default NodeList
