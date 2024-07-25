/*
 * @Author: liaojingping
 * @Date: 2023-02-24 09:41:31
 * @LastEditors: huanglili 1249854467@qq.com
 * @LastEditTime: 2024-06-20 17:11:10
 * @FilePath: \BigScreenWebFE\src\service\source.ts
 * @Description: 大屏数据源
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import { get, post } from './fetch'

// KJ418
/**
 * 获取单位下所有水文流量组
 * @param options 
 * @returns 
 */
export async function getHydroGroup(options?: { [key: string]: any }) {
  return get({
    url: '/kj418/getAgencyGroups',
    loading: true,
    params: options
  })
}

/**
 * 获取单位下所有水文监测点
 * @param options 
 * @returns 
 */
export async function getHydroPoint(options?: { [key: string]: any }) {
  return get({
    url: '/kj418/getAgencyMonitorPoints',
    loading: true,
    params: options
  })
}

/**
 * 获取所有水文监测类型
 * @param options 
 * @returns 
 */
export async function getHydroType(options?: { [key: string]: any }) {
  return get({
    url: '/kj418/getMonitorTypes',
    loading: true,
    params: options
  })
}

/**
 * 各监测类型测点数统计
 * @param options 
 * @returns 
 */
export async function getHydroPointStatistic(options?: { [key: string]: any }) {
  return get({
    url: '/kj418/getAgencyGroups',
    loading: true,
    params: options
  })
}

// 微震

/**
 * 获取单位下的检测工区集合
 * @param options 
 * @returns 
 */
export async function getArea(options?: { [key: string]: any }) {
  return get({
    url: '/microseism/bigScreen/getAgencyMonitorAreas',
    loading: true,
    params: options
  })
}

/**
 * 获取单位下的地层
 * @param options 
 * @returns 
 */
export async function getStrat(options?: { [key: string]: any }) {
  return get({
    url: '/microseism/bigScreen/getAgencyStratums',
    loading: true,
    params: options
  })
}

// 水质

/**
 * 获取单位下所有取样点
 * @param options 
 * @returns 
 */
export async function getPoints(options?: { [key: string]: any }) {
  return get({
    url: '/waterPro/bigScreen/getAgencyPoints',
    loading: true,
    params: options
  })
}

/**
 * 获取单位下所有水源类型
 * @param options 
 * @returns 
 */
export async function getWaterSource(options?: { [key: string]: any }) {
  return get({
    url: '/waterPro/bigScreen/getAgencySource',
    loading: true,
    params: options
  })
}


// 电法

/**
 * 获取单位下所有工区
 * @param options 
 * @returns 
 */
export async function getEmsArea(options?: { [key: string]: any }) {
  return get({
    url: '/waterRisk/bsdata/getEmsArea',
    loading: true,
    params: options
  })
}

/**
 * 获取单位下所有巷道
 * @param options 
 * @returns 
 */
export async function getTunnel(options?: { [key: string]: any }) {
  return get({
    url: '/waterRisk/bsdata/getTunnel',
    loading: true,
    params: options
  })
}

/**
 * 获取单位下所有工作面
 * @param options 
 * @returns 
 */
export async function getWorkSpace(options?: { [key: string]: any }) {
  return get({
    url: '/waterRisk/bsdata/getWorkspace',
    loading: true,
    params: options
  })
}

//随掘电法
/**
 * 获取所有工区
 * @param options 
 * @returns 
 */
export async function getAcEmsArea(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/shinDen/findAll',
    loading: true,
    params: options
  })
}

/**
 * 获取所有工作面
 * @param options 
 * @returns 
 */
export async function getAcWorkSpace(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/shinDen/getAllWorkspace',
    loading: true,
    params: options
  })
}
// 矿压
// 获取所有位置
export async function getEngineeringAll(id: string) {
  return get({
    url: `/bigscreen/mp/engineering/${id}`,
    loading: true
    // params: options
  })
}
// 获取单位下所有测站
export async function getStation(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/mp/station',
    loading: true,
    params: options
  })
}
// 获取单位下所有传感器类型
export async function getSensorType(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/mp/sensorType',
    loading: true,
    data: options
  })
}
// 获取单位下所有测点
export async function getSensor(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/mp/sensor',
    loading: true,
    data: options
  })
}
// 获取所有数据源
export async function getSensorSource() {
  return get({
    url: '/bigscreen/mp/sensorSource',
    loading: true
  })
}
// 获取通道
export async function getCh(options?: { [key: string]: any }) {
  return post({
    url: '/bigscreen/mp/getCh',
    loading: true,
    params: options
  })
}
// 获取工作面
export async function getEngineering(agencyId: string,engType: number) {
  return get({
    url: `/bigscreen/mp/engineering/${agencyId}/${engType}`,
    loading: true
    // params: options
  })
}