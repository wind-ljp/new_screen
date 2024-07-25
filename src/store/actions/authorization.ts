/*
 * @Author: liaojingping
 * @Date: 2023-02-14 11:05:42
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:30:12
 * @FilePath: \配置大屏\src\store\actions\authorization.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import {
  MENU,
  MENU_TYPE,
  MENU_STATE,
  STRATEGY,
  STRATEGY_TYPE,
  RESIDENCES
} from '../actionType'
import { Dispatch } from 'redux'
import { IResult } from '../../service/fetch'
import Ajax from '../../service/index'
import asession from '../../utils/session-storage'

// 获取菜单接口类型
export interface IMenuAction {
  type: MENU_TYPE
  datas: MENU_STATE
}

// 获取策略
export interface IStrategyAction {
  type: STRATEGY_TYPE
  key: string
}

// 定义 ModifyMenuAction 类型
export type ModifyMenuAction = IMenuAction | IStrategyAction

// 获取菜单action
const actionMenu = (datas: MENU_STATE): IMenuAction => ({
  type: MENU,
  datas: datas
})

// 获取策略 action
const actionStrategy = (key: string): IStrategyAction => ({
  type: STRATEGY,
  key
})

// 更新菜单方法
export const getMenu =
  (datas?: MENU_STATE, callback?: Function) =>
  (dispatch: Dispatch, getState: Function) => {
    const state = getState()

    if (datas) {
      dispatch(actionMenu(datas))
    } else {
      if (
        state &&
        state.authorization &&
        state.authorization.menu &&
        state.authorization.menu.length
      ) {
        return false
      }
      const memus: MENU_STATE = [
        {
          isMemu: 1,
          resUrl: '/frame/preview',
          components: 'preview',
          resIcon: 'e670',
          resTitle: '水情水害预警',
          status: 0,
          flag: false,
          subResource: []
        },
        {
          isMemu: 2,
          resUrl: '/frame/report',
          components: '',
          resIcon: '&#xe65a',
          resTitle: '大屏设计',
          flag: true,
          status: 0,
          subResource: [
            {
              isMemu: 1,
              resUrl: '/frame/report/home-page',
              components: 'report/homePage',
              resIcon: '',
              resTitle: '主页管理',
              status: 0,
              flag: true,
              subResource: []
            },
            {
              isMemu: 1,
              resUrl: '/frame/report/big-screen',
              components: 'report/bigScreen',
              resIcon: '',
              resTitle: '大屏管理',
              status: 0,
              flag: true,
              subResource: []
            }
            // {
            //   isMemu: 1,
            //   resUrl: '/frame/report/data',
            //   components: 'report/dataSource',
            //   resIcon: '',
            //   resTitle: '数据源管理',
            //   status: 0,
            //   flag: true,
            //   subResource: []
            // }
          ]
        },
        {
          isMemu: 2,
          resUrl: '/frame/home',
          components: 'home',
          resIcon: '&#xe8b9',
          resTitle: '首页',
          status: 0,
          flag: false,
          subResource: []
        },
        {
          isMemu: 1,
          resUrl: '/frame/configuration',
          components: 'configuration',
          resIcon: '',
          resTitle: '配置',
          status: 0,
          flag: false,
          subResource: []
        }
      ]
      dispatch(actionMenu(memus))
    }
  }

// 获取策略
export const getStrategy = (key: string) => (dispatch: Dispatch) => {
  dispatch(actionStrategy(key))
}
