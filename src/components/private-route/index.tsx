/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-06 10:01:02
 * @FilePath: \bigscreen\src\components\private-route\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import session from '../../utils/session-storage'
import React, { memo, useEffect } from 'react'
import { Route, Redirect, RouteProps  } from 'react-router-dom'
interface IPrivateRoute {
  component: React.ComponentType<any>
  title: string
  isPrivate: boolean
  [propName: string]: RouteProps[keyof RouteProps]
}
const PrivateRoute = memo(
  ({
    component: Component,
    title,
    isPrivate,
    ...rest
  }: IPrivateRoute) => {
    // 处理标题
    useEffect(() => {
      document.title = title
    }, [title])
    return (
      <Route
        {...rest}
        render={() => {
          if (isPrivate) {
            return session.getItem('token') ? (
              <Component {...rest} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            )
          } else {
            return <Component {...rest} />
          }
        }}
      />
    )
  }
)
export default PrivateRoute
