/*
 * @Description: userinfo reducers
 * @Author: liaojp
 * @Date: 2022-10-11 11:24:07
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:05:05
 * @FilePath: \bigscreen\src\store\reducers\userinfo.ts
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { ModifyAction } from '../actions/userinfo'
import { USERINFO } from '../actionType'
import { IAnyObject } from '../../types/index'

// 处理并返回 state

export const userinfo = (
  state: IAnyObject = {},
  action: ModifyAction
): IAnyObject => {
  switch (action.type) {
    case USERINFO:
      return action.data
    default:
      return state
  }
}
