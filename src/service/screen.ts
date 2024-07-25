/*
 * @Author: liaojingping
 * @Date: 2023-02-10 14:24:33
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-05-17 09:26:48
 * @FilePath: \配置大屏\src\service\screen.ts
 * @Description: 大屏相关接口
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import { get, post } from './fetch'

/**
 * 所有屏
 * @param options 
 * @returns 
 */
export async function getList(options?: { [key: string]: any }) {
  return get({
    url: '/bigscreen/bigScreen',
    loading: true,
    params: options
  })
}

/**
 * 添加屏
 * @param options 
 * @returns 
 */
export async function addPost(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/bigScreen/save',
    loading: true,
    data: options
  })
}

/**
 * 更新屏
 * @param options 
 * @returns 
 */
export async function editPost(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/bigScreen/edit',
    loading: true,
    data: options
  })
}

/**
 * 置首屏
 * @param options 
 * @returns 
 */
export async function setScreenIndex(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/bigScreen/modifyShowIndex',
    loading: true,
    data: options
  })
}

/**
 * 删除屏
 * ids: id集合
 * @param options 
 * @returns 
 */
export async function delPost(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/bigScreen/remove',
    loading: true,
    data: options
  })
}

/**
 * 预览屏 + 翻页操作
 * 返回当前页和前后各一页
 * @param options 
 * @returns 
 */
export async function previewPost(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/bigScreen/preview',
    loading: true,
    data: options
  })
}

/**
 * 根据id获取屏
 * @param options 
 * @returns 
 */
export async function getScreenById(id: any) {
  return get({
    url: `/bigscreen/bigScreen/${id}`,
    loading: true
  })
}