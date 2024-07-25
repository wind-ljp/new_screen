/*
 * @Description: 跳转矿井大屏
 * @Author: liaojingping
 * @Date: 2024-01-16 10:30:01
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:40:12
 */

import * as THREE from 'three'
import locationImg from '../../assets/image/three/location.png'

function mineTag({
  posCamera,
  position,
  id,
  unitName,
  title
}) {
  const map = new THREE.TextureLoader().load(locationImg, function (texture) {})

  const material = new THREE.SpriteMaterial({
    map,
    transparent: true,
    alphaToCoverage: true
  })

  const mesh = new THREE.Sprite(material)
  mesh.name = 'LocationScreen' + id
  let moveX = 0
  let moveY = 0
  let moveZ = 0
  if (posCamera) {
    moveX = posCamera.split(',')[0]
    moveY = posCamera.split(',')[1]
    moveZ = posCamera.split(',')[2]
  }
  mesh.position.set(parseFloat(position.x) - parseFloat(moveX), parseFloat(position.z) - parseFloat(moveZ), parseFloat(-position.y) + parseFloat(moveY))
  mesh.scale.set(window.locationMesh.x, window.locationMesh.y, window.locationMesh.z)
  return mesh
}

function mineTagClick(name) {
  const query = name.split('LocationScreen')[1]
  const id = query.split(';')[0]
  const agencyId = query.split(';')[1]
  window.open(`/#/frame/preview?id=${id}&agencyId=${agencyId}`, '_blank')
}

export { mineTag, mineTagClick }