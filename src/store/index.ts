/*
 * @Description: store入口文件
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2022-11-27 12:02:20
 * @FilePath: \bigscreen-develop\src\store\index.ts
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// 数据持久化工具
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware: any[] = [thunk]

// 判断是否是正式环境
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const persistConfig = {
  // 存储的名称
  key: 'BASE_ROOT',
  // 存储方式
  storage: storage,
  // 某个reducer,不持久化
  // blacklist: ['development'],
  // 需要持久化的模块
  whitelist: [
    'counter',
    'dictionary',
    'authorization',
    'largeScreen',
    'userinfo'
  ]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default createStore(persistedReducer, applyMiddleware(...middleware))
