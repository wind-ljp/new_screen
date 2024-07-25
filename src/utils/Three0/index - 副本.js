/*
 * @Author: liaojingping
 * @Date: 2022-11-16 10:27:35
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-21 15:54:27
 * @FilePath: \配置大屏\src\utils\Three0\index.js
 * @Description: threejs 渲染模型
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { message } from 'antd'
import { TWEEN } from 'three/examples/jsm/libs/tween.module'
// import Stats from 'three/examples/jsm/libs/stats.module'
import { tag, tagClick } from './renderer.js'
import AxisRender from './CoordinateAxesRenderer'
import { getSize, getColor } from './riskEventTool'
import { maxSize } from '../../utils/tools'

class Tmodel {
  /**
   * node: 传入的DOM节点；(必填项)
   * bgcolor：场景背景色；
   * hasAxis：坐标轴；
   * cameraHelper: 模拟相机视锥体
   * directionLightHelper: 平行光辅助对象，表示光位置的平面和表示光方向的线段
   * gridHelper: 坐标格辅助对象
   * arrowHelper: 用于模拟方向的三维箭头对象
   * */
  constructor({
    node,
    bgcolor = 0xb9d3ff,
    hasAxis = false,
    cameraHelper = false,
    directionLightHelper = false,
    gridHelper = false,
    loadDone = (argu) => {},
    showModal = (argu1) => {},
    source,
    loadedModelLength = 1,
    modelType,
    screen
  }) {
    this.node = node
    this.bgcolor = bgcolor
    this.scene = null
    this.camera = null
    this.screen = screen
    this.cameraDefaults = {
      posCamera: new THREE.Vector3(
        screen.posCamera?.split(',')[0] ?? 0,
        screen.posCamera?.split(',')[1] ?? 0,
        screen.posCamera?.split(',')[2] ?? 0
      ),
      posCameraTarget: new THREE.Vector3(0, 0, 0),
      near: window.near,
      far: window.far,
      fov: window.fov
    }
    this.cameraTarget = this.cameraDefaults.posCameraTarget
    this.aspectRatio = 1 // 横纵比
    this.renderer = null
    this.controls = null
    this.hasAxis = hasAxis
    this.cameraHelper = cameraHelper
    this.directionLightHelper = directionLightHelper
    this.gridHelper = gridHelper
    this.historyObj = null
    this.historyMaterial = null
    this.historyMaterialIndex = null
    this.violencePrevention = false
    this.dounbleModelId = ''
    document.oncontextmenu = function () {
      return false
    }
    window.Tmodel = this
    window.addEventListener('resize', this.resizeWindow, false)
    window.addEventListener('click', this.handleSensor, { passive: false })
    // 移除全局监听move事件，此操作导致模型操作异常卡顿
    // window.addEventListener('mousemove', this.handleSensorMove, { passive: false })
    this.recalcAspectRatio()
    this.renderNum = 0 // 渲染执行次数
    this.loadDone = loadDone
    this.showModal = showModal
    this.source = source // 模型来源
    this.loadedModelLength = loadedModelLength // 需要加载的模型数量
    this.subScene = new AxisRender()
    // this.stats = new Stats()
    this.modelType = modelType
  }

  init() {
    // 创建场景对象
    this.scene = new THREE.Scene()

    // 创建相机对象
    this.camera = new THREE.PerspectiveCamera(
      this.cameraDefaults.fov,
      this.aspectRatio,
      this.cameraDefaults.near,
      this.cameraDefaults.far
    )

    // 相机视锥体
    if (this.cameraHelper) {
      this.scene.add(new THREE.CameraHelper(this.camera))
    }

    // 辅助坐标系，参数250表示坐标系大小，可以根据场景大小去设置
    if (this.hasAxis) {
      this.scene.add(new THREE.AxesHelper(1000))
    }

    // 坐标格辅助对象
    if (this.gridHelper) {
      const size = 1000
      const divisions = 10
      const gridHelper = new THREE.GridHelper(size, divisions)
      this.scene.add(gridHelper)
    }

    // 添加灯光
    // const ambientLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1) // 环境光
    // this.scene.add(ambientLight)
    const light = new THREE.AmbientLight(0x404040, 1) // soft white light
    this.scene.add(light)

    const directional_light = new THREE.DirectionalLight(0xffffff, 1)
    directional_light.position.set(1500, 1500, 0)
    directional_light.castShadow = true
    directional_light.shadowCascade = true
    directional_light.shadow.mapSize.width = 512 * 2
    directional_light.shadow.mapSize.height = 512 * 2
    directional_light.shadow.bias = 0.05
    directional_light.shadow.normalBias = 0.05
    directional_light.shadow.camera.near = 0.5
    directional_light.shadow.camera.far = 500
    this.scene.add(directional_light)

    const directional_light2 = new THREE.DirectionalLight(0xffffff, 1)
    directional_light2.position.set(1500, -1500, 0)
    directional_light2.castShadow = true
    directional_light2.shadow.mapSize.width = 512 * 2
    directional_light2.shadow.mapSize.height = 512 * 2
    directional_light2.shadow.bias = 0.05
    directional_light2.shadow.normalBias = 0.05
    directional_light2.shadow.camera.near = 0.5
    directional_light2.shadow.camera.far = 500
    // this.scene.add(directional_light2)

    const directional_light3 = new THREE.DirectionalLight(0xffffff, 1)
    directional_light3.position.set(-1500, 1500, 500)
    directional_light3.castShadow = true
    directional_light3.shadow.mapSize.width = 512 * 2
    directional_light3.shadow.mapSize.height = 512 * 2
    directional_light3.shadow.bias = 0.05
    directional_light3.shadow.normalBias = 0.05
    directional_light3.shadow.camera.near = 0.5
    directional_light3.shadow.camera.far = 500
    // this.scene.add(directional_light3)

    const directional_light4 = new THREE.DirectionalLight(0xffffff, 1)
    directional_light4.position.set(-1500, -1500, 0)
    directional_light4.castShadow = true
    directional_light4.shadowCascade = true
    directional_light4.shadow.mapSize.width = 512 * 2
    directional_light4.shadow.mapSize.height = 512 * 2
    directional_light4.shadow.bias = 0.05
    directional_light4.shadow.normalBias = 0.05
    directional_light4.shadow.camera.near = 0.5
    directional_light4.shadow.camera.far = 500
    this.scene.add(directional_light4)

    // 灯光辅助对象
    if (this.directionLightHelper) {
      const helper = new THREE.DirectionalLightHelper(
        directional_light,
        500,
        '#00ff00'
      )
      this.scene.add(helper)
      const helper2 = new THREE.DirectionalLightHelper(
        directional_light2,
        500,
        '#00ff00'
      )
      this.scene.add(helper2)
      const helper3 = new THREE.DirectionalLightHelper(
        directional_light3,
        500,
        '#00ff00'
      )
      this.scene.add(helper3)
      const helper4 = new THREE.DirectionalLightHelper(
        directional_light4,
        500,
        '#00ff00'
      )
      this.scene.add(helper4)
    }

    // 添加渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      // autoClear: true, // 定义渲染器是否在渲染每一帧之前自动清除其输出。
      aplha: true, // 是否可将背景色设置透明
      logarithmicDepthBuffer: true // 使用对数深度缓存
      // preserveDrawingBuffer: true // 保存缓冲
    })

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setClearColor(this.bgcolor, 0)
    // this.renderer.localClippingEnabled = true // 全局裁剪
    this.renderer.camera = this.camera
    this.subScene.setHostRenderer(this.renderer)

    this.clock = new THREE.Clock() //创建THREE.Clock对象，用于计算上次调用经过的时间
    this.controls = new TrackballControls(this.camera, this.renderer.domElement)
    this.controls.rotateSpeed = 8.0 //相机的旋转速度
    this.controls.zoomSpeed = 1.5 //相机的缩放速度
    this.controls.panSpeed = 0.5 //相机的平移速度
    this.controls.staticMoving = true //关闭拖拽惯性移动
    // this.controls.noZoom = true; // 禁用缩放
    this.controls.noPan = true // 禁用平移
    this.controls.noRotate = true // 禁用旋转
    // this.controls.maxDistance = 45000 //滚轮能滚到的最远距离

    //相机移动监听事件
    this.controls.addEventListener('change', (event) => {})

    // this.stats.setMode(0)
    // this.stats.domElement.style.position = 'absolute'
    // this.stats.domElement.style.left = '450px'
    // this.stats.domElement.style.top = '100px'
    // document.getElementById('three').appendChild(this.stats.domElement)

    document.getElementById('three').appendChild(this.renderer.domElement)
    this.resetCamera()
    this.resizeDisplayGL()
    this.render()
  }

  // 计算横纵比
  recalcAspectRatio() {
    this.aspectRatio =
      this.node.offsetHeight === 0
        ? 1
        : this.node.offsetWidth / this.node.offsetHeight
  }

  resizeDisplayGL() {
    this.controls.handleResize()
    this.recalcAspectRatio()
    this.renderer.setSize(this.node.offsetWidth, this.node.offsetHeight, false)
    this.updateCamera()
  }

  resizeWindow() {
    if (this.controls) {
      this.Tmodel.resizeDisplayGL()
    }
  }

  updateCamera() {
    this.camera.aspect = this.aspectRatio
    // this.camera.lookAt(this.cameraTarget)
    this.camera.lookAt(this.cameraDefaults.posCamera)
    this.camera.updateProjectionMatrix() //更新相机投影矩阵
  }

  resetCamera() {
    this.controls.reset()
    this.camera.position.copy(this.cameraDefaults.posCamera)
    this.cameraTarget.copy(this.cameraDefaults.posCameraTarget)
    this.updateCamera()
  }

  render() {
    requestAnimationFrame(() => {
      if (this.render) {
        this.render()
        TWEEN.update()
        // this.stats.update()
        if (this.renderNum < this.loadedModelLength) {
          // 在 type 为 Group 的数量与接口获取到的所有模型数量一致时，代表所有模型已经渲染完成
          // 此时可以切换下一张屏幕
          this.renderNum = this.scene.children.filter((i) => i.isGroup).length
          if (this.renderNum >= this.loadedModelLength) {
            this.loadDone(this.renderNum)
          }
        }
      }
    })
    const delta = this.clock.getDelta() // 获取自上次调用的时间差
    this.controls.update(delta)
    this.renderer.render(this.scene, this.camera)
  }

  playZoomIncrease() {
    this.camera.fov -= 5
    this.camera.updateProjectionMatrix()
  }

  playZoomDecrease() {
    this.camera.fov += 5
    this.camera.updateProjectionMatrix()
  }

  playZoom() {
    this.controls.noZoom = false
    this.controls.noRotate = true
    this.controls.noPan = true
    this.controls.mouseButtons = {
      LEFT: 0,
      MIDDLE: 2,
      RIGHT: 1
    }
    this.restoreMaterial()
    window.removeEventListener('click', this.handle)
    window.removeEventListener('dblclick', this.handleDb)
  }

  playTranslate() {
    // this.controls.noZoom = true;
    this.controls.noRotate = true
    this.controls.noPan = false
    this.controls.mouseButtons = {
      RIGHT: 0
    }
    this.restoreMaterial()
    window.removeEventListener('click', this.handle)
    window.removeEventListener('dblclick', this.handleDb)
  }

  playRotate() {
    this.controls.mouseButtons = {
      LEFT: 0
    }
    // this.controls.noZoom = true;
    this.controls.noRotate = false
    this.controls.noPan = true
    this.restoreMaterial()
    window.removeEventListener('click', this.handle)
    window.removeEventListener('dblclick', this.handleDb)
  }

  playSelect() {
    // this.controls.noZoom = true;
    this.controls.noRotate = true
    this.controls.noPan = true
    window.addEventListener('click', this.handle, { passive: false })
    window.addEventListener('dblclick', this.handleDb, { passive: false })
  }

  playDirect(key) {
    // this.controls.noZoom = true;
    this.controls.noRotate = true
    this.controls.noPan = true
    this.restoreMaterial()
    window.removeEventListener('click', this.handle)
    window.removeEventListener('dblclick', this.handleDb)
    const actions = {
      front: () => this.camera.position.set(0, 0, 5000),
      end: () => this.camera.position.set(0, 0, -5000),
      left: () => this.camera.position.set(-5000, 0, 0),
      right: () => this.camera.position.set(5000, 0, 0),
      up: () => this.camera.position.set(0, 5000, 0),
      down: () => this.camera.position.set(0, -5000, 0)
    }
    return (
      (actions[key]?.() && this.camera.lookAt(this.scene.position)) ??
      'invalid value'
    )
  }

  playReset() {
    // this.controls.noZoom = true;
    this.controls.noRotate = true
    this.controls.noPan = true
    this.controls.reset()
    this.camera.position.set(
      this.screen.posCamera?.split(',')[0] ?? 0,
      this.screen.posCamera?.split(',')[1] ?? 0,
      this.screen.posCamera?.split(',')[2] ?? 0
    )
    this.camera.nera = this.cameraDefaults.near
    this.camera.far = this.cameraDefaults.far
    this.restoreMaterial()
    window.removeEventListener('click', this.handle)
    window.removeEventListener('dblclick', this.handleDb)
  }

  loadObjAndMtl(item) {
    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()
    mtlLoader.setMaterialOptions({
      side: THREE.DoubleSide
    })
    mtlLoader.load(item.showMtl, (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load(
        item.obj,
        (object) => {

          let LBTscale
          if (
            this.source === '1' ||
            this.source === '6' ||
            this.source === '2'
          ) {
            LBTscale = this.getFitScaleValue(object)
          } else {
            LBTscale = 0.8
          }
          // 放大三维显示倍数，默认为1
          object.scale.multiplyScalar(LBTscale)
          if (this.modelType == 2) {
            // 非三维建模子系统模型源
            let temp = object.children.map((i) => {
              return {
                id: i.name,
                modelName: i.name,
                objectName: '组合模型'
              }
            })
            this.loadDone(temp)
          }

          object.name = `Model${item.id}`
          if (object.children.length) {
            object.castShadow = true
            object.receiveShadow = true

            object.children.forEach((item) => {
              if (item.isMesh) {
                item.castShadow = true
                item.receiveShadow = true
              }
              if (item.material.map) {
                item.material.map.encoding = THREE.sRGBEncoding
                item.material.map.anisotropy = 1
              }

              if (item.material.emissiveMap) {
                item.material.emissiveMap.encoding = THREE.sRGBEncoding
              }

              if (item.material.map || item.material.emissiveMap) {
                item.material.needsUpdate = true
              }

              if (Array.isArray(item.material)) {
                item.material.forEach((m) => {
                  if (m.map) {
                    m.map.encoding = THREE.sRGBEncoding
                    m.map.anisotropy = 1
                  }

                  if (m.emissiveMap) {
                    m.emissiveMap.encoding = THREE.sRGBEncoding
                  }

                  if (m.map || m.emissiveMap) {
                    m.needsUpdate = true
                  }

                  /**
                   * 1. 为外部直接导入的模型时不做任何处理
                   * 2. 从三维建模获取为贴图时，材质color统一设置为new THREE.Color('rgb(255, 255, 255)')
                   * 3. 从三维建模获取为颜色时，材质map设置为null，保留颜色
                   */
                  switch (m.type) {
                    case 'MeshPhongMaterial':
                      if (m.map) {
                        if (this.modelType === 0) {
                          // 颜色
                          m.map = null
                        }
                        if (this.modelType === 1) {
                          // 贴图
                          m.color = new THREE.Color('rgb(255, 255, 255)')
                        }
                      }
                      break
                    case 'PointsMaterial':
                      if (m.map) {
                        if (this.modelType === 0) {
                          // 颜色
                          m.map = null
                        }
                        if (this.modelType === 1) {
                          // 贴图
                          m.color = new THREE.Color('rgb(255, 255, 255)')
                        }
                      }
                      break
                    default:
                      break
                  }
                })
              } else {
                /**
                 * 同上
                 */
                if (item.type === 'Mesh') {
                  if (item.material.map) {
                    if (this.modelType === 0) {
                      // 颜色
                      item.material.color.map = null
                    }
                    if (this.modelType === 1) {
                      // 贴图
                      item.material.color = new THREE.Color(
                        'rgb(255, 255, 255)'
                      )
                    }
                  }
                }
                if (item.type === 'Points') {
                  if (item.material.map) {
                    if (this.modelType === 0) {
                      // 颜色
                      item.material.color.map = null
                    }
                    if (this.modelType === 1) {
                      // 贴图
                      item.material.color = new THREE.Color(
                        'rgb(255, 255, 255)'
                      )
                    }
                  }
                }
              }
            })
          }
          this.scene.add(object)
        },
        (xhr) => {},
        (error) => {
          message.error('obj模型加载错误')
          console.error(error)
        }
      )
    })
  }

  // 传感器点击
  handleSensor(event) {
    if (this.Tmodel.controls) {
      const intersects = this.Tmodel.getIntersects2(event)
      if (Array.isArray(intersects) && intersects.length) {
        tagClick({
          e: intersects[0].object.name,
          showModal: this.Tmodel.showModal
        })
      }
    }
  }

  // 给传感器图标添加cursor
  handleSensorMove(event) {
    if (this.Tmodel.controls) {
      const intersects = this.Tmodel.getIntersects2(event)
      if (Array.isArray(intersects) && intersects.length) {
        if (intersects[0].object.isSprite) {
          document.body.style.cursor = 'pointer'
        } else {
          document.body.style.cursor = 'default'
        }
      } else {
        document.body.style.cursor = 'default'
      }
    }
  }

  // 获取与射线相交的对象数组
  getIntersects(event) {
    event.preventDefault()
    const rayCaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
    rayCaster.setFromCamera(mouse, this.camera)
    //获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。true是对其后代进行查找
    const intersects = rayCaster.intersectObjects(
      this.scene.children.filter((i) => i.isGroup),
      true
    )
    return intersects
  }

  // 获取与射线相交的对象数组
  getIntersects2(event) {
    event.preventDefault()
    const rayCaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
    rayCaster.setFromCamera(mouse, this.camera)
    //获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。true是对其后代进行查找
    const intersects = rayCaster.intersectObjects(
      this.scene.children,
      //.filter((i) => i.isSprite)
      true
    )
    return intersects
  }

  // 标记选中的模型
  isChecked(intersects) {
    if (this.historyObj) {
      if (this.historyMaterial && this.historyMaterialIndex) {
        //材质数组
        this.historyObj.material[this.historyMaterialIndex].copy(
          this.historyMaterial
        )
      } else {
        this.historyObj.material = this.historyMaterial
      }
    }

    this.historyObj = intersects[0].object

    if (Array.isArray(intersects[0].object.material)) {
      // 材质数组
      this.historyMaterial =
        intersects[0].object.material[intersects[0].index].clone()
      this.historyMaterialIndex = intersects[0].index
      intersects[0].object.material[intersects[0].index] = new THREE[
        intersects[0].object.material[intersects[0].index].type
      ]({
        color: 0x00ff00,
        size: intersects[0].object.material[intersects[0].index].size
      })
    } else if (
      intersects[0].object.material &&
      Object.keys(intersects[0].object.material).length
    ) {
      // 材质对象
      this.historyMaterialIndex = null
      this.historyMaterial = intersects[0].object.material.clone()
      intersects[0].object.material = new THREE[
        intersects[0].object.material.type
      ]({
        color: 0xffff00,
        side: 2
      })
    }
  }

  // 还原材质
  restoreMaterial() {
    if (this.historyObj) {
      if (this.historyMaterial && this.historyMaterialIndex) {
        //材质数组
        this.historyObj.material[this.historyMaterialIndex].copy(
          this.historyMaterial
        )
      } else {
        this.historyObj.material = this.historyMaterial
      }
    }
  }

  // 设置模型透明度
  setModelOpacity(value) {
    if (this.historyObj) {
      if (this.historyMaterialIndex) {
        this.historyObj.material[this.historyMaterialIndex].transparent = true
        this.historyObj.material[this.historyMaterialIndex].opacity =
          value / 100
      } else {
        this.historyObj.material.transparent = true
        this.historyObj.material.opacity = value / 100
      }
      this.historyMaterial.transparent = true
      this.historyMaterial.opacity = value / 100
    } else {
      message.warning('设置透明度前，请选择模型！')
    }
  }

  // 选中模型
  handle(event) {
    // this -> window
    if (this.Tmodel.controls) {
      const intersects = this.Tmodel.getIntersects(event)
      if (Array.isArray(intersects) && intersects.length) {
        this.Tmodel.isChecked(intersects)
      }
    }
  }

  // 计算几何体外边界矩形
  calcOutBorder(intersects) {
    const geometry = intersects[0].object.geometry
    geometry.boundingBox ?? geometry.computeBoundingBox()
    return geometry.boundingBox
  }

  // 计算中心点坐标并偏移
  calcCenterCoorAndMove(boundingBox) {
    // 选中模型中心位置（世界坐标）
    const endPosition = this.scene.localToWorld(
      boundingBox.getCenter(new THREE.Vector3(0, 0, 0))
    )

    const newPos = this.cameraDefaults.posCamera

    // 偏移动画
    const tween = new TWEEN.Tween({
      x1: this.camera.position.x, // 相机x
      y1: this.camera.position.y, // 相机y
      z1: this.camera.position.z, // 相机z
      x2: this.controls.target.x, // 控制点的中心点x
      y2: this.controls.target.y, // 控制点的中心点y
      z2: this.controls.target.z // 控制点的中心点z
    })
    tween.to(
      {
        x1: newPos.x,
        y1: newPos.y,
        z1: newPos.z,
        x2: endPosition.x,
        y2: endPosition.y,
        z2: endPosition.z
      },
      2000
    )
    tween.onUpdate((object) => {
      this.camera.position.x = object.x1
      this.camera.position.y = object.y1
      this.camera.position.z = object.z1
      this.controls.target.x = object.x2
      this.controls.target.y = object.y2
      this.controls.target.z = object.z2
      this.controls.update()
    })

    tween.onComplete(() => {
      this.callBack && this.callBack()
    })
    // tween.easing(TWEEN.Easing.Cubic.InOut);
    // tween.easing(TWEEN.Easing.Back.InOut);
    tween.easing(TWEEN.Easing.Back.Out)
    tween.start()
  }

  callBack() {}

  goCenter(intersects) {
    const boundingBox = this.calcOutBorder(intersects)
    this.calcCenterCoorAndMove(boundingBox)
  }

  // 双击模型
  handleDb(event) {
    // this -> window
    const intersects = this.Tmodel.getIntersects(event)
    if (Array.isArray(intersects) && intersects.length) {
      this.Tmodel.isChecked(intersects)
      this.Tmodel.goCenter(intersects)
    }
  }

  getFitScaleValue(obj) {
    var boxHelper = new THREE.BoxHelper(obj)
    boxHelper.geometry.computeBoundingBox()
    const box = boxHelper.geometry.boundingBox //获取模型边界
    const maxDiameter =
      1.5 *
      Math.max(
        box.max.x - box.min.x,
        box.max.y - box.min.y,
        box.max.z - box.min.z
      ) //数值越大，模型越小
    return Math.ceil(this.camera.position.z / maxDiameter)
  }

  // TODO0
  // 1）如果是场景中
  // scene.remove(group); // 删除组

  // 2）如果是 组中
  // groups.remove(group);// 删除模型
  clearGroup(group) {
    // 释放 几何体 和 材质
    const clearCache = (item) => {
      item.geometry.dispose()
      item.material.dispose()
    }
    // 递归释放物体下的 几何体 和 材质
    const removeObj = (obj) => {
      let arr = obj.children.filter((x) => x)
      arr.forEach((item) => {
        if (item.children.length) {
          removeObj(item)
        } else {
          clearCache(item)
          item.clear()
        }
      })
      obj.clear()
      arr = null
    }
    // 移除 group
    removeObj(group)
  }

  deleteObject(group) {
    // 递归遍历组对象group释放所有后代网格模型绑定几何体占用内存
    group.traverse(function (obj) {
      if (obj.type === 'Mesh') {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
    // 删除场景对象scene的子对象group
    this.scene.remove(group)
  }

  /**
   * 传感器标签
   */
  addTag({
    id,
    typeId,
    position,
    name,
    pointStatus,
    deviceStatus,
    useStatus,
    emsDeviceStatus
  }) {
    const label = tag({
      id,
      typeId,
      position,
      name,
      showModal: this.showModal,
      pointStatus,
      deviceStatus,
      useStatus,
      emsDeviceStatus
    })
    this.scene.add(label)
  }

  /**
   * 控制模型及传感器显示状态
   */
  setModelAndSensorStatus(id, visible) {
    this.scene.getObjectByName(id).visible = visible
  }

  /**
   * 添加微震传感器
   * 根据等级和能量确定球体的颜色和大小
   */
  addQuakeTag({ id, position, seismSourceLevel, seismSourceEnergy }) {
    // console.log(position, seismSourceLevel, seismSourceEnergy)
    const size = getSize(seismSourceEnergy)
    const color = getColor(seismSourceLevel)
    const geometry = new THREE.SphereGeometry(size, 32, 16)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(`rgb(${color.r}, ${color.g}, ${color.b})`)
    })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.name = `risk;${id}`
    sphere.position.set(position.x, position.y, position.z)
    this.scene.add(sphere)
  }

  /**
   * 移除window事件传感器点击
   */
  removeSensorClick() {
    window.removeEventListener('click', window.Tmodel.handleSensor)
  }
  /**
   * 还原window事件传感器点击
   */
  restoreSensorClick() {
    window.addEventListener('click', window.Tmodel.handleSensor, {
      passive: false
    })
  }
  /**
   * 根据模型name获取对应的模型
   */
  getModelByName(name) {
    const model = this.scene.getObjectByName(name)?.children?.length
      ? this.scene.getObjectByName(name).children.filter((i) => i.isMesh)[0]
      : this.scene.getObjectByName(name)

    if (this.historyObj && this.historyMaterial) {
      this.restoreMaterial()
    }

    this.historyObj = model
    this.historyMaterial = model.material.clone()

    model.material = new THREE[model.material.type]({
      color: 0xffff00,
      side: THREE.DoubleSide
    })

    let box3 = new THREE.Box3()
    box3.expandByObject(model) // 计算模型包围盒
    let size = new THREE.Vector3()
    box3.getSize(size) // 计算包围盒尺寸
    let center = new THREE.Vector3()
    box3.getCenter(center) // 计算一个层级模型对应包围盒的几何体中心坐标
    let max = maxSize(size) //包围盒长宽高中最大的一个值，用来表征模型的尺寸

    // 偏移动画
    const tween = new TWEEN.Tween({
      x1: this.camera.position.x, // 相机x
      y1: this.camera.position.y, // 相机y
      z1: this.camera.position.z, // 相机z
      x2: this.controls.target.x, // 控制点的中心点x
      y2: this.controls.target.y, // 控制点的中心点y
      z2: this.controls.target.z // 控制点的中心点z
    })

    this.camera.lookAt(center)
    this.camera.near = max * 0.1 //最好和相机位置或者说包围盒关联，别设置0.1 1之类看似小的值
    this.camera.far = max * 300 //根据相机位置和包围大小设置，把包围盒包含进去即可，宁可把偏大，不可偏小
    this.camera.updateProjectionMatrix() //渲染范围改变，注意更新投影矩阵

    tween.to(
      {
        x1: center.clone().addScalar(max).x,
        y1: center.clone().addScalar(max).y,
        z1: center.clone().addScalar(max).z,
        x2: center.x,
        y2: center.y,
        z2: center.z
      },
      2000
    )

    tween.onUpdate((object) => {
      this.camera.position.x = object.x1
      this.camera.position.y = object.y1
      this.camera.position.z = object.z1
      this.controls.target.x = object.x2
      this.controls.target.y = object.y2
      this.controls.target.z = object.z2
      this.controls.update()
    })

    tween.onComplete(() => {
      this.callBack && this.callBack()
    })

    tween.easing(TWEEN.Easing.Cubic.InOut)
    tween.start()
  }
}

export default Tmodel
