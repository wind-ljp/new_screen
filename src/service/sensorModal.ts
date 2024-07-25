/*
 * @Author: liaojingping
 * @Date: 2023-03-17 16:53:09
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-03-24 10:43:48
 * @FilePath: \配置大屏\src\service\sensorModal.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import { post } from './fetch'

/**
 * 电法工区关联数据
 */
export async function emsAreaData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/emsMonitorAreaData',
    loading: true,
    data: options
  })
}

/**
 * 电法主机关联数据
 */
export async function emsDeviceData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/emsDeviceData',
    loading: true,
    data: options
  })
}

/**
 * 微震事件关联数据
 */
export async function riskEventData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/eventData',
    loading: true,
    data: options
  })
}

/**
 * 水文测点关联数据
 */
export async function waterPointData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/latesData',
    loading: true,
    data: options
  })
}

/**
 * 水文设备关联数据
 */
export async function waterDeviceData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/deviceData',
    loading: true,
    data: options
  })
}

/**
 * 微震工区关联数据
 */
export async function riskAreaData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/monitorAreaData',
    loading: true,
    data: options
  })
}

/**
 * 取样点关联数据
 */
export async function samplingPointData(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/pointData',
    loading: true,
    data: options
  })
}