/*
 * @Author: liaojingping
 * @Date: 2023-03-22 15:07:44
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-03-22 17:02:26
 * @FilePath: \配置大屏\src\utils\Three0\CoordinateAxesRenderer.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import * as THREE from 'three'
import CoordinateAxes from './CoordinateAxes'

/**
 * This renderer monitors the host renderer's camera, and keeps a coordinate axes
 * the same direction as host renderer's
 */
export default class CoordinateAxesRenderer {
  hostRenderer?: any
  coordinateAxes?: any
  camera?: any
  scene?: any
  renderer?: any
  ambientLight?: any
  height = 150 // size of render area
  width = 150

  constructor (width?: number, height?: number) {
    this.width = width || this.width
    this.height = height || this.height
    this.init()
  }

  init () {
    this.initRenderer()
    this.initScene()
    this.animate()
  }

  initRenderer () {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.width, this.height)
    const temp = document.getElementById('three') || document.body
    this.renderer.domElement.classList.add('three-axis')
    temp.appendChild(this.renderer.domElement)
  }

  initScene () {
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color(0xebf2f7, 0)

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    // this.camera.position.set(1.5, 1.5, 1.5)
    // this.camera.lookAt(0, 0, 0)
    this.scene.add(this.camera)

    // this.ambientLight = new THREE.AmbientLight(0xcccccc, 1)
    // this.scene.add(this.ambientLight)

    this.coordinateAxes = new CoordinateAxes()
    this.scene.add(this.coordinateAxes)
  }

  render () {
    if (this.renderer && this.scene && this.camera) {
      this.update()
      this.renderer.render(this.scene, this.camera)
    }
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.render()
  }

  setHostRenderer (renderer: any) {
    this.hostRenderer = renderer
    this.update()
  }

  update () {
    if (!this.hostRenderer || !this.hostRenderer.camera) {
      return
    }
    
    const camera = this.hostRenderer.camera
    if (camera) {
      const target = new THREE.Vector3()
      camera.getWorldDirection(target)
      const up = camera.up
      this.updateCameraDirection(target, up)
    }
  }

  /**
   * Update axes according to camera direction.
   * Camera's direction is the only input factor for this class. It always look at the origin.
   * @param direction
   */
  updateCameraDirection (direction: any, up: any) {
    if (!this.camera || !direction) {
      return
    }
    direction.normalize()
    const distanceFactor = 2 // keep camera a little farer, so it looks better
    const centerDelta = 0.3 // put the lookAt point to be in the first quadrant
    this.camera.position.set(-direction.x * distanceFactor + centerDelta, -direction.y * distanceFactor + centerDelta, -direction.z * distanceFactor + centerDelta)
    this.camera.lookAt(centerDelta, centerDelta, centerDelta) // it always looks at the origin
    this.camera.up = up
  }
}