/*
 * @Description: 组件组合
 * @Author: liaojp
 * @Date: 2022-08-20 16:07:16
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:41:06
 * @FilePath: \BigScreenWebFE\src\widget\group\index.tsx
 * Copyright (c) 2022 by  liaojp  , All Rights Reserved.
 */
import { FC, HTMLAttributes, ReactNode, useState } from 'react'
import BorderBox1 from '@jiaminghi/data-view-react/es/borderBox1'
import BorderBox2 from '@jiaminghi/data-view-react/es/borderBox2'
import BorderBox3 from '@jiaminghi/data-view-react/es/borderBox3'
import BorderBox4 from '@jiaminghi/data-view-react/es/borderBox4'
import BorderBox5 from '@jiaminghi/data-view-react/es/borderBox5'
import BorderBox6 from '@jiaminghi/data-view-react/es/borderBox6'
import BorderBox7 from '@jiaminghi/data-view-react/es/borderBox7'
import BorderBox8 from '@jiaminghi/data-view-react/es/borderBox8'
import BorderBox9 from '@jiaminghi/data-view-react/es/borderBox9'
import BorderBox10 from '@jiaminghi/data-view-react/es/borderBox10'
import BorderBox11 from '@jiaminghi/data-view-react/es/borderBox11'
import BorderBox12 from '@jiaminghi/data-view-react/es/borderBox12'
import BorderBox13 from '@jiaminghi/data-view-react/es/borderBox13'
import { getStyles } from '../../utils/tools'
import anime from 'animejs'
import './index.scss'

interface IGroupProps extends HTMLAttributes<HTMLDivElement> {
  options: any
  children: ReactNode
}

const arrow = (e: any) => {
  let position: any = {}
  let iconRotate: Record<string, any> = {}
  if (e.showIconPosition === 'bottom') {
    position = {}
    position.top = `-${e.iconHeight + 10}px`
    position.left = `calc(50% - ${e.iconWidth / 2}px)`
    iconRotate = {
      transform: 'rotate(0deg)'
    }
  } else if (e.showIconPosition === 'top') {
    position = {}
    position.bottom = `-${e.iconHeight + 10}px`
    position.left = `calc(50% - ${e.iconWidth / 2}px)`
    iconRotate = {
      transform: 'rotate(180deg)'
    }
  } else if (e.showIconPosition === 'left') {
    position = {}
    position.right = `-${e.iconWidth - 3}px`
    position.top = `calc(50% - ${e.iconHeight / 2}px)`
    iconRotate = {
      transform: 'rotate(90deg)'
    }
  } else {
    position = {}
    position.left = `-${e.iconWidth - 3}px`
    position.top = `calc(50% - ${e.iconHeight / 2}px)`
    iconRotate = {
      transform: 'rotate(270deg)'
    }
  }
  return e.showWidgetStatus ? (
    <img
      id='arrow'
      src={e.showIconAddress || require('../../assets/image/configuration/icon/upArrow.png')}
      alt='arrow'
      style={{
        width: `${e.iconWidth}px`,
        height: `${e.iconHeight}px`,
        position: 'absolute',
        cursor: 'pointer',
        ...position,
        ...iconRotate
      }}
      onClick={() => {
        const node = document.getElementById(`app-widget__item${e.onlyKey}`)
        const chartNode = node
          ?.getElementsByClassName('app-wrapper')[0]
          ?.getElementsByTagName('div')[0]
        if (e.showIconPosition === 'left') {
          if (node?.style.getPropertyValue('left') === `-${e.width}px`) {
            anime({
              targets: node,
              left: `${e.left}px`
            })
            anime({
              targets: chartNode,
              opacity: 1,
              duration: 500
            })
          } else {
            anime({
              targets: node,
              left: `-${e.width}px`
            })
            anime({
              targets: chartNode,
              opacity: 0,
              duration: 500
            })
          }
        } else if (e.showIconPosition === 'right') {
          if (node?.style.getPropertyValue('right')) {
            anime({
              targets: node,
              left: `${e.left}px`
            })
            anime({
              targets: chartNode,
              opacity: 1,
              duration: 500
            })
            node?.style.removeProperty('right')
          } else {
            node?.style.removeProperty('left')
            node?.style.setProperty('right', '0')
            anime({
              targets: node,
              right: `-${e.width}px`
            })
            anime({
              targets: chartNode,
              opacity: 0,
              duration: 500
            })
          }
        } else if (e.showIconPosition === 'top') {
          if (node?.style.getPropertyValue('top') === `-${e.height}px`) {
            anime({
              targets: node,
              top: `${e.top}px`
            })
            anime({
              targets: chartNode,
              opacity: 1,
              duration: 500
            })
          } else {
            anime({
              targets: node,
              top: `-${e.height}px`
            })
            anime({
              targets: chartNode,
              opacity: 0,
              duration: 500
            })
          }
        } else if (node?.style.getPropertyValue('top')) {
          node?.style.removeProperty('top')
          node?.style.setProperty('bottom', '0')
          anime({
            targets: node,
            bottom: `-${e.height}px`
          })
          anime({
            targets: chartNode,
            opacity: 0,
            duration: 500
          })
        } else {
          anime({
            targets: node,
            top: `${e.top}px`
          })
          anime({
            targets: chartNode,
            opacity: 1,
            duration: 500
          })
          node?.style.removeProperty('bottom')
        }
      }}
    />
  ) : null
}

const Group: FC<IGroupProps> = ({ options, children }) => {
  if (options.groupBorderType === 1) {
    return (
      <>
        {arrow(options)}
        <BorderBox1>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox1>
      </>
    )
  } else if (options.groupBorderType === 2) {
    return (
      <>
        {arrow(options)}
        <BorderBox2>
          <div
            id={options.onlyKey}
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox2>
      </>
    )
  } else if (options.groupBorderType === 3) {
    return (
      <>
        {arrow(options)}
        <BorderBox3>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox3>
      </>
    )
  } else if (options.groupBorderType === 4) {
    return (
      <>
        {arrow(options)}
        <BorderBox4>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox4>
      </>
    )
  } else if (options.groupBorderType === 5) {
    return (
      <>
        {arrow(options)}
        <BorderBox4 reverse='{true}'>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox4>
      </>
    )
  } else if (options.groupBorderType === 6) {
    return (
      <>
        {arrow(options)}
        <BorderBox5>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox5>
      </>
    )
  } else if (options.groupBorderType === 7) {
    return (
      <>
        {arrow(options)}
        <BorderBox5 reverse='{true}'>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox5>
      </>
    )
  } else if (options.groupBorderType === 8) {
    return (
      <>
        {arrow(options)}
        <BorderBox6>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox6>
      </>
    )
  } else if (options.groupBorderType === 9) {
    return (
      <>
        {arrow(options)}
        <BorderBox7>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox7>
      </>
    )
  } else if (options.groupBorderType === 10) {
    return (
      <>
        {arrow(options)}
        <BorderBox8 reverse='{true}'>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox8>
      </>
    )
  } else if (options.groupBorderType === 11) {
    return (
      <>
        {arrow(options)}
        <BorderBox8 reverse='{true}'>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox8>
      </>
    )
  } else if (options.groupBorderType === 12) {
    return (
      <>
        {arrow(options)}
        <BorderBox9>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox9>
      </>
    )
  } else if (options.groupBorderType === 13) {
    return (
      <>
        {arrow(options)}
        <BorderBox10>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox10>
      </>
    )
  } else if (options.groupBorderType === 14) {
    return (
      <>
        {arrow(options)}
        <BorderBox11>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox11>
      </>
    )
  } else if (options.groupBorderType === 15) {
    return (
      <>
        {arrow(options)}
        <BorderBox12>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox12>
      </>
    )
  } else if (options.groupBorderType === 16) {
    return (
      <>
        {arrow(options)}
        <BorderBox13>
          <div
            style={Object.assign(getStyles(options), {
              borderStyle: 'none !important',
              boxShadow: 'none !important'
            })}
            className='app-element app-element__group animated'>
            {children}
          </div>
        </BorderBox13>
      </>
    )
  } else if (options.groupBorderType === 17) {
    return (
      <>
        {arrow(options)}
        <div
          style={Object.assign(getStyles(options), {
            background: 'rgba(11,16,28,0.64)',
            border: '1px solid rgba(65,141,255,0.14)',
            boxShadow: '0px 45px 59px 0px rgba(7,14,29,0.27)',
            borderRadius: '10px'
          })}
          className='app-element app-element__group'>
          {children}
        </div>
      </>
    )
  } else {
    return (
      <>
        {arrow(options)}
        <div
          style={Object.assign(getStyles(options), {
            borderStyle: 'none !important',
            boxShadow: 'none !important',
            backgroundImage: `none`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
          })}
          className='app-element app-element__group'>
          {children}
        </div>
      </>
    )
  }
}
export default Group
