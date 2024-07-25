/*
 * @Author: liaojingping
 * @Date: 2022-11-16 17:06:27
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:38:16
 * @FilePath: \配置大屏\src\pages\three\components\control\index.tsx
 * @Description: 3D模型操作控件
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import './index.scss'
import { Dropdown, Space, Typography, message } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import classnames from 'classnames'
import togglePng from '../../../../assets/image/three/toggle.png'
import fullPng from '../../../../assets/image/three/full.png'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '正'
  },
  {
    key: '2',
    label: '后'
  },
  {
    key: '3',
    label: '左'
  },
  {
    key: '4',
    label: '右'
  },
  {
    key: '5',
    label: '顶'
  },
  {
    key: '6',
    label: '底'
  }
]

const items2: MenuProps['items'] = [
  {
    key: '1',
    label: '模型'
  },
  {
    key: '2',
    label: '模型 + 统计面板'
  },
  {
    key: '3',
    label: '模型 + 资源面板'
  }
]

const Control = (props: {
  sendValue: (arg0: string) => void
  sendKey: (arg0: string) => void
  toFullScreen: () => void
  toggleChart: (argus: string) => void
  isColor: boolean
}) => {
  const [directionText, setDirectionText] = useState<string>('正')
  const [isMove, setIsMove] = useState<boolean>(false)
  const [isRotate, setIsRotate] = useState<boolean>(false)
  const [isSelect, setIsSelect] = useState<boolean>(false)

  const onClick: MenuProps['onClick'] = (val) => {
    val.domEvent.nativeEvent.stopImmediatePropagation()
    setIsMove(false)
    setIsRotate(false)
    setIsSelect(false)
    switch (val.key) {
      case '1':
        setDirectionText('正')
        props.sendKey('front')
        break
      case '2':
        setDirectionText('后')
        props.sendKey('end')
        break
      case '3':
        setDirectionText('左')
        props.sendKey('left')
        break
      case '4':
        setDirectionText('右')
        props.sendKey('right')
        break
      case '5':
        setDirectionText('顶')
        props.sendKey('up')
        break
      case '6':
        setDirectionText('底')
        props.sendKey('down')
        break
      default:
        break
    }
  }

  const onClick2: MenuProps['onClick'] = (val) => {
    val.domEvent.nativeEvent.stopImmediatePropagation()
    props.toggleChart(val.key)
  }

  return (
    <>
      <div className='tool' onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <img
          title='全屏/按ESC键退出全屏'
          src={fullPng}
          alt='full'
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation()
            props.toFullScreen()
          }}
        />
        <Dropdown
          getPopupContainer={() =>
            document.getElementById('full-screen-container') ?? document.body
          }
          menu={{
            items: items2,
            selectable: true,
            onClick: onClick2
          }}>
          <img
            title='切换'
            src={togglePng}
            alt='toggle'
          />
        </Dropdown>
      </div>
      <div className='control-container' onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <div
          title='平移'
          className={classnames('list', { move: !isMove, moveActive: isMove })}
          tabIndex={1}
          onClick={() => {
            props.sendValue('translate')
            setIsMove(true)
            setIsRotate(false)
            setIsSelect(false)
          }}
        />
        <div
          title='旋转'
          className={classnames('list', {
            rotate: !isRotate,
            rotateActive: isRotate
          })}
          tabIndex={2}
          onClick={() => {
            props.sendValue('rotate')
            setIsMove(false)
            setIsRotate(true)
            setIsSelect(false)
          }}
        />
        <div
          title='选择'
          className={classnames('list', {
            select: !isSelect,
            selectActive: isSelect
          })}
          tabIndex={3}
          onClick={() => {
            if (!props.isColor) {
              props.sendValue('select')
              setIsMove(false)
              setIsRotate(false)
              setIsSelect(true)
            } else {
              message.info('颜色模式下，此功能无法使用！');
            }
          }}
        />
        {/* <div title='放大' className='list big' onClick={() => props.sendValue('big')} />
      <div title='缩小' className='list small' onClick={() => props.sendValue('small')} /> */}
        <div
          title='复位'
          className='list reset'
          onClick={() => {
            props.sendValue('reset')
            setIsMove(false)
            setIsRotate(false)
            setIsSelect(false)
          }}
        />
        {/* <div
          style={{
            width: '1px',
            height: '80%',
            backgroundColor: '#142345'
          }}
        /> */}
        {/* <div className='list' title='视角'>
          <Dropdown
            getPopupContainer={() =>
              document.getElementById('full-screen-container') ?? document.body
            }
            menu={{
              items,
              selectable: true,
              onClick
            }}>
            <Typography.Link>
              <Space style={{ color: '#4DAAFE', fontSize: '17px' }}>
                {directionText}
              </Space>
            </Typography.Link>
          </Dropdown>
        </div> */}
      </div>
    </>
  )
}
export default Control
