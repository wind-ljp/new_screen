/*
 * @Author: liaojingping
 * @Date: 2022-11-17 11:42:12
 * @LastEditors: liaojingping
 * @LastEditTime: 2022-12-01 15:45:15
 * @FilePath: \bigscreen-develop\src\pages\three\components\buttonList\index.tsx
 * @Description: 模型方位组件
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import './index.scss'
import { Button } from 'antd';
const buttonList = (props: { sendKey: (arg0: string) => void }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" onClick={() => props.sendKey('front')}>
        前
      </Button>
      <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => props.sendKey('end')}>
        后
      </Button>
      <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => props.sendKey('left')}>
        左
      </Button>
      <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => props.sendKey('right')}>
        右
      </Button>
      <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => props.sendKey('up')}>
        上
      </Button>
      <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => props.sendKey('down')}>
        下
      </Button>
    </div>
  );
};
export default buttonList;
