/*
 * @Author: liaojingping
 * @Date: 2023-03-15 11:48:02
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-01-15 15:09:38
 * @FilePath: \配置大屏\src\service\three.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import { get, post } from './fetch'

/**
 * 获取所有模型
 * @returns 
 */
export async function getAllThreeModel(url: string) {
  return get({
    url,
    loading: true
  })
}

/**
 * 获取所有传感器点
 * @returns 
 */
export async function getAllSensorPoints(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/point',
    loading: true,
    data: options
  })
}

/**
 * 获取单位本身即下级单位的所有屏幕
 * @returns 
 */
export async function getAllScreen(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/bigScreen/bigScreenJoin',
    loading: true,
    data: options
  })
}