/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:36:00
 * @FilePath: \bigscreen\src\App.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, Suspense, lazy } from 'react'
import Loading from './components/loading'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
// 私有路由
import ComPrivateRoute from './components/private-route'

interface IAppProps {}

const App: FC<IAppProps> = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          {/*登录*/}
          <Route
            path='/login'
            component={lazy(
              () => import(/*webpackChunkName:"login"*/ './pages/login')
            )}
          />
          {/*有头部的框架*/}
          <ComPrivateRoute
            isPrivate={true}
            path='/frame'
            title='框架'
            component={lazy(
              () => import(/*webpackChunkName:"frame"*/ './pages/frame')
            )}
          />
          <Redirect path='*' exact to='/login' />
        </Switch>
      </Router>
      {/* 接口loading */}
      <div id='js_loading'>
        <Spin tip='loading' />
      </div>
    </Suspense>
  )
}

export default App
