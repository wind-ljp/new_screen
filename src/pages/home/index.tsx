/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:53:02
 * @FilePath: \bigscreen\src\pages\home\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, useEffect } from 'react'
import { ALL_STATE } from '../../store/actionType'
import { connect } from 'react-redux'
import { getStrategy } from '../../store/actions/authorization'
import { IAnyObject } from '../../types'
import './index.scss'

interface IHomeProps {
  strategy: IAnyObject
  getStrategy: (key: string) => void
  path: string
}

const Home: FC<IHomeProps> = ({ strategy, getStrategy, path }) => {
  // 获取策略
  useEffect(() => {
    getStrategy(path)
  }, [path, getStrategy])

  return (
    <div className='app-screen-home'>
      <span>欢迎来到大屏后台管理系统</span>
    </div>
  )
}

// 对应的statemkjh m,
const mapStateToProps = (state: ALL_STATE) => ({
  strategy: state.authorization.strategy
})

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = {
  getStrategy
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
