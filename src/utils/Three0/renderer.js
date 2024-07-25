/*
 * @Author: liaojingping
 * @Date: 2023-03-14 14:04:21
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:40:43
 * @FilePath: \配置大屏\src\utils\Three0\renderer.js
 * @Description: 渲染三维模型页传感器标签
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import * as THREE from 'three'
import pointNormal from '../../assets/image/three/water/point-normal.png' // 测点正常
import pointAbNormal from '../../assets/image/three/water/point-abnormal.png' // 测点异常
import deviceNormal from '../../assets/image/three/water/disc-normal.png' // 设备未连接正常
import deviceAbNormal from '../../assets/image/three/water/disc-abnormal.png' // 设备未连接异常
import deviceCNormal from '../../assets/image/three/water/c-normal.png' // 设备已连接正常
import deviceCAbNormal from '../../assets/image/three/water/c-abnormal.png' // 设备已连接异常
import eleNormal from '../../assets/image/three/ele/normal.png' // 电法正常
import eleAbNormal from '../../assets/image/three/ele/abnormal.png' // 电法异常
import waterSource from '../../assets/image/three/source/source-point.png'
import {
  waterDeviceData,
  waterPointData,
  emsDeviceData,
  samplingPointData
} from '../../service/sensorModal'
import { getFormData } from '../tools'
import session from '../../utils/session-storage'

function tag({
  id,
  typeId,
  position,
  name,
  pointStatus,
  deviceStatus,
  useStatus,
  emsDeviceStatus,
  posCamera
}) {
  // 设备0 测点1 主机3 取样点6
  // 设备2个状态 测点1个状态 主机一个状态
  // 取样点直接用icon
  // pointStatus: item.pointStatus, // 水文测点数据状态
  // deviceStatus: item.deviceStatus, // 水文设备通讯状态
  // useStatus: item.useStatus, // 水文设备启用状态
  // emsDeviceStatus: item.emsDeviceStatus // 电法主机通讯状态
  // posCamera // 偏移坐标
  let src = ''
  // 水文测点
  if (pointStatus === '正常') {
    src = pointNormal
  }
  if (pointStatus === '异常') {
    src = pointAbNormal
  }
  // 水文设备
  if (useStatus === '启用') {
    if (deviceStatus === '通讯中断') {
      src = deviceCAbNormal
    }
    if (deviceStatus === '通讯正常') {
      src = deviceCNormal
    }
  }
  if (useStatus === '停用') {
    if (deviceStatus === '通讯中断') {
      src = deviceNormal
    }
    if (deviceStatus === '通讯正常') {
      src = deviceAbNormal
    }
  }
  // 电法主机
  if (emsDeviceStatus === '中断') {
    src = eleAbNormal
  }
  if (emsDeviceStatus === '正常') {
    src = eleNormal
  }
  // 水质取样点
  if (typeId === 6) {
    src = waterSource
  }
  const map = new THREE.TextureLoader().load(src, function (texture) {
    texture.colorSpace = THREE.SRGBColorSpace
  })

  const material = new THREE.SpriteMaterial({
    map,
    transparent: true,
    alphaToCoverage: true
  })

  // material.needsUpdate = false
  const mesh = new THREE.Sprite(material)
  mesh.name = id + ';' + typeId + ';' + name
  //mesh.position.set(position.x, position.y, position.z)
  // mesh.position.set(position.x, position.z, -position.y)
  let moveX = 0
  let moveY = 0
  let moveZ = 0
  if (posCamera) {
    moveX = posCamera.split(',')[0]
    moveY = posCamera.split(',')[1]
    moveZ = posCamera.split(',')[2]
  }
  mesh.position.set(parseFloat(position.x) - parseFloat(moveX), parseFloat(position.z) - parseFloat(moveZ), parseFloat(-position.y) + parseFloat(moveY))
  console.log()
  if (typeId === 0) { // 水文设备
    mesh.scale.set(window.meshEquip.x, window.meshEquip.y, window.meshEquip.z)
  }
  if (typeId === 1) { // 水文测点
    mesh.scale.set(window.meshPoint.x, window.meshPoint.y, window.meshPoint.z)
  }
  if (typeId === 5) { // 电法主机
    mesh.scale.set(window.meshHost.x, window.meshHost.y, window.meshHost.z)
  }
  if (typeId === 6) { // 取样点
    mesh.scale.set(window.meshSample.x, window.meshSample.y, window.meshSample.z)
  }
  return mesh
}

function tagClick({ e, showModal }) {
  const id = e.split(';')[0]
  const typeId = parseInt(e.split(';')[1])
  const name = e.split(';')[2]

  if (typeId === 0) {
    // 水文设备
    waterDeviceData({
      id
    }).then((res) => {
      if (res.data) {
        showModal({ id, typeId, name, data: res.data, height: 381 })
      }
    })
  }

  if (typeId === 1) {
    // 水文测点
    waterPointData(getFormData({ pointId: id })).then((res) => {
      if (res.data) {
        showModal({ id, typeId, name, data: res.data, height: 433 })
      }
    })
  }

  if (typeId === 2) {
    // 电法主机
    emsDeviceData({
      agencyId: session.getItem('defaultUnitId'),
      deviceId: id
    }).then((res) => {
      if (res.data) {
        showModal({ id, typeId, name, data: res.data, height: 433 })
      }
    })
  }

  if (typeId === 6) {
    // 取样点
    samplingPointData(getFormData({ pointId: id })).then((res) => {
      if (res.data) {
        showModal({ id, typeId, name, height: 433, data: res.data })
      }
    })
  }
}

export { tag, tagClick }
