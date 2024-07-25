/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-01-17 15:43:48
 * @FilePath: \large-screen-configuration\src\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import App from './App'
// import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index-indexeddb'
import '@ant-design/pro-table/dist/table.css'
// import 'default-passive-events'
// 国际化
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.min.css'
import './index.scss'
// import './mock'
moment.locale('zh-cn')
// const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
