/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-02-09 15:16:44
 * @FilePath: \large-screen-configuration\src\service\index.ts
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { get, IResult, post } from './fetch'
import { IAnyObject } from '../types'
interface IApi {
  [propNames: string]: (params?: IAnyObject) => Promise<IResult>
}

const api: IApi = {
  // 获取echarts geo数据
  // getGeo(params: any) {
  //   return get({
  //     url: `/geo/areas_v3/bound/${params.field}.json`,
  //     loading: true,
  //     servicePrefix: 'local'
  //   })
  // },
  // 登录
  // login(params: any) {
  //   return post({
  //     url: `/login`,
  //     loading: true,
  //     data: params,
  //     servicePrefix: 'local'
  //   })
  // },
  // 简报列表
  // report(params: any) {
  //   return get({
  //     url: `/report-list`,
  //     loading: true,
  //     data: params,
  //     servicePrefix: 'local'
  //   })
  // },
  // // 简报删除
  // reportDelete(params: any) {
  //   return post({
  //     url: `/report-delete`,
  //     loading: true,
  //     data: params,
  //     servicePrefix: 'local'
  //   })
  // }
}

export default api
