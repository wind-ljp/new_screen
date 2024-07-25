/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:03:47
 * @FilePath: \large-screen-configuration\src\service\config.ts
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { IAnyObject } from '../types'

interface IConfig {
  [propName: string]: IAnyObject
}

const config: IConfig = {
  // 开发
  development: {
    default: '',
    geo: '',
    local:''
  },
  // 测试
  test: {
    default: '',
    geo: '',
    local: ''
  },
  // 正式
  production: {
    default: '',
    geo: '',
    local: ''
  }
}

export default config
