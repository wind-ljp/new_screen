/*
 * @Descripttion: 设置透明度组件
 * @Author: liaojp
 * @CreatedDate: Do not Edit
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-23 10:48:55
 */
import React from 'react'
import { Slider } from 'antd'
import './index.scss'

const Opacity = (props: { getOpacity: (arg0: number) => void; opacity: number }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    /**
     * 1、 e.stopPropagation(); 在没有涉及到原生事件注册只有react事件时使用。
     * 2、 e.nativeEvent.stopImmediatePropagation(); 注册了原生事件后使用。
     */
    const ev = e ?? window.event;
    ev.nativeEvent.stopImmediatePropagation();
  };
  const change = (val: number) => {
    props.getOpacity(val);
  };
  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        zIndex: '1000',
        right: '50px',
        width: '150px',
        background: '#4FB432',
        borderRadius: '10px',
        color: '#FFFFFF',
        opacity: '.9',
        padding: '5px',
        textAlign: 'center'
      }}
      onClick={(e) => handleClick(e)}
    >
      <div>设置透明度</div>
      <Slider
        style={{ width: '85%' }}
        onChange={change}
        value={props.opacity}
        tooltip={{ open: true }}
        min={1}
      />
    </div>
  );
};

export default Opacity;
