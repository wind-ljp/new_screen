/*
 * @Author: liaojingping
 * @Date: 2023-02-09 14:17:01
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-11-08 16:11:51
 * @FilePath: \配置大屏\src\service\user.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import { post } from './fetch'

export async function loginSystem(options?: { [key: string]: any }) {
  return post({
    url: '/userSystem/login',
    loading: true,
    data: options,
    noToken: true
  })
}

export async function uploadPic(options?: FormData) {
  return post({
    url: '/userSystem/file/upload',
    loading: true,
    data: options
  })
}

export async function getAllDictionary(options?: FormData) {
  return post({
    url: '/userSystem/bigscreenDictionary/getList',
    loading: true,
    data: options
  })
}