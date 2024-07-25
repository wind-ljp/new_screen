/*
 * @Author: liaojingping
 * @Date: 2022-11-16 17:06:27
 * @LastEditors: liaojingping
 * @LastEditTime: 2022-12-01 15:45:29
 * @FilePath: \bigscreen-develop\src\pages\three\components\control\index.tsx
 * @Description: 3D模型操作控件
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import './index.scss'
import { Tabs } from 'antd';
import ButtonList from '../buttonlist';
import { useState } from 'react';

const Control = (props: { sendValue: (arg0: string) => void; sendKey: (arg0: string) => void }) => {
  const [show, setShow] = useState<boolean>(false);
  const tabChange = (val: string) => {
    props.sendValue(val);
    if (val === 'direct') {
      setShow(true);
      return;
    }
    setShow(false);
  };

  const items = [
    { label: '缩放', key: 'zoom' },
    { label: '平移', key: 'translate' },
    { label: '旋转', key: 'rotate' },
    { label: '选择', key: 'select' },
    { label: '方位', key: 'direct' },
    { label: '复位', key: 'reset' }
  ];

  const getKey = (key: string) => {
    props.sendKey(key);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '70px',
        background: 'transparent',
        position: 'absolute',
        top: '80px',
        zIndex: '1000',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '500px', height: '100%', borderRadius: '10px' }}>
        <Tabs defaultActiveKey="zoom" centered onTabClick={tabChange} items={items} />
        {show ? <ButtonList sendKey={getKey} /> : <></>}
      </div>
    </div>
  );
};
export default Control;
