/*
 * @Author: liaojingping
 * @Date: 2022-11-16 10:36:31
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:29:58
 * @FilePath: \配置大屏\src\pages\three\index.tsx
 * @Description: 三维模型底图
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
import Tmodel from '../../utils/Three0'
import { useEffect, useState, useRef, useImperativeHandle } from 'react'
import { getAllSensorPoints, getAllThreeModel } from '../../service/three'
import { getFormData, killThreeModel } from '../../utils/tools'
import session from '../../utils/session-storage'
import Control from './components/control'
import Opacity from './components/opacity'
import NodeList from './components/nodelist'
import NodeList2 from './components/nodelist/sensor' // 传感器
import SensorModal from './components/modal'
import { useUnmount, useUpdateEffect } from 'ahooks'
import './index.scss'
import { useLocation } from 'react-router-dom'

interface OpenModal {
  id: string & number
  typeId: number
  position: {
    x: string & number
    y: string & number
    z: string & number
  }
  name: string
  data: any
  height: number
}

const TM = (props: {
  showControl: boolean
  cale: number | string
  screen: any // 屏幕信息
  onRef: any
  loadDone: () => void
  toFullScreen: () => void
  toggleChart: (argus: string) => void
}) => {
  const Node: any = useRef(null)
  const [modelClass, setModdelClass] = useState<any>(null)
  const [opacity, setOpacityValue] = useState<number>(100)
  const [isShowOpacity, setIsShowOpacity] = useState<boolean>(false) // 透明度
  const [modalOpen, setModalOpen] = useState<boolean>(false) // 资源弹窗
  const [sensorList, setSensorList] = useState<Record<string, any>>({}) // 传感器列表-用于资源栏展示
  const [sensorList2, setSensorList2] = useState<any[]>([]) // 传感器列表- 用于模型页渲染标签
  const [modelList, setModelList] = useState<any[]>([]) // 模型列表
  const [selectedId, setSelectedId] = useState<any>() // 选中的传感器id
  const [selectedType, setSelectedType] = useState<any>() // 选中的传感器类型
  const [selectedName, setSelectedName] = useState<any>() // 选中的传感器名称
  const [sensorData, setSensorData] = useState<any>(null)
  const [modalHeight, setModalHeight] = useState<number>(373)
  const [isColor, setIsColor] = useState<boolean>(false)
  const location = useLocation()
  const urlSearch: any = new URLSearchParams(location.search)

  // 打开资源弹窗
  const showModal = (argus: OpenModal) => {
    setSensorData(argus.data || null)
    setSelectedId(argus.id)
    setSelectedType(argus.typeId)
    setSelectedName(argus.name)
    setModalHeight(argus.height)
    setModalOpen(true)
  }

  // 所有模型渲染完成
  const loadDone = (res: any) => {
    if (Array.isArray(res)) {
      setModelList([
        {
          modelList: res,
          modelTypeName: '组合模型',
          modelType: 2 // 外部导入模型标识
        }
      ])
    }
    props.loadDone()
  }

  useEffect(() => {
    // 传感器
    getAllSensorPoints(
      getFormData({
        agencyId: urlSearch.get('agencyId')
          ? urlSearch.get('agencyId')
          : session.getItem('defaultUnitId')
      })
    ).then((res) => {
      if (res.data.length) {
        setSensorList2(res.data)
        const sensorList = res.data.reduce(
          (groups: { [x: string]: any[] }, type: { typeName: string }) => {
            const key = type.typeName
            if (!groups[key]) {
              groups[key] = []
            }
            groups[key].push(type)
            return groups
          },
          {}
        )
        setSensorList(sensorList)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Node.current) {
      let temp: any[] = []
      if (props?.screen?.threeModelSource) {
        if (props?.screen?.threeModelSource === '6') {
          temp = [
            {
              modelName: '组合模型1',
              showMtl: 'model5/2.mtl',
              obj: 'model5/2.obj',
              id: 'Model6'
            }
          ]

          const M = new Tmodel({
            node: Node.current,
            loadDone,
            showModal,
            source: props?.screen?.threeModelSource,
            loadedModelLength: 1,
            modelType: 2,
            screen: props.screen,
            setFirstOpacity
          })
          setModdelClass(M)
          M.init()
          temp.forEach((item) => M.loadObjAndMtl(item))
        } else if (props?.screen?.threeModelSource === '2') {
          temp = [
            {
              modelName: '组合模型3',
              showMtl: 'model/123.mtl',
              obj: 'model/123.obj',
              id: 'Model66'
            }
          ]

          const M = new Tmodel({
            node: Node.current,
            loadDone,
            showModal,
            source: props?.screen?.threeModelSource,
            loadedModelLength: 1,
            modelType: 2,
            screen: props.screen,
            setFirstOpacity
          })
          setModdelClass(M)
          M.init()
          temp.forEach((item) => M.loadObjAndMtl(item))
        } else if (props?.screen?.threeModelSource === '1') {
          temp = [
            {
              modelName: '组合模型2',
              showMtl: 'other1/3.mtl',
              obj: 'other1/3.obj',
              id: 'Model1'
            }
          ]

          const M = new Tmodel({
            node: Node.current,
            loadDone,
            showModal,
            source: props?.screen?.threeModelSource,
            loadedModelLength: 1,
            modelType: 2,
            screen: props.screen,
            setFirstOpacity
          })
          setModdelClass(M)
          M.init()
          temp.forEach((item) => M.loadObjAndMtl(item))
        } else if (props?.screen?.threeModelSource.startsWith(':')) {
          const file = props?.screen?.threeModelSource.substring(1)
          temp = [
            {
              modelName: '组合模型',
              showMtl: file + '.mtl',
              obj: file + '.obj',
              id: 'Model1'
            }
          ]

          const M = new Tmodel({
            node: Node.current,
            loadDone,
            showModal,
            source: props?.screen?.threeModelSource,
            loadedModelLength: 1,
            modelType: 2,
            screen: props.screen,
            setFirstOpacity
          })
          setModdelClass(M)
          M.init()
          temp.forEach((item) => M.loadObjAndMtl(item))
        } else {
          getAllThreeModel(props?.screen?.threeModelSource).then((res) => {
            if (res?.data?.length) {
              if (res.data[0].modelType != 2) {
                setModelList(res.data)
              }
              setIsColor(res.data[0].modelType === 0)
              temp = res.data
                .map((i: { modelList: any[] }) => i.modelList)
                .flat()
              const M = new Tmodel({
                node: Node.current,
                loadDone,
                showModal,
                source: props?.screen?.threeModelSource,
                loadedModelLength: temp.length,
                modelType: res.data[0].modelType,
                screen: props.screen,
                setFirstOpacity
              })
              setModdelClass(M)
              M.init()
              temp.forEach((item) => M.loadObjAndMtl(item))
            }
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useUpdateEffect(() => {
    if (Node.current) {
      if (Array.isArray(sensorList2) && sensorList2.length) {
        sensorList2
          // .filter((i) => i.typeId === 6)
          .forEach((item) => {
            if (item.typeId === 5) {
              // 微震事件
              setTimeout(() => {
                if (window.Tmodel.scene.children.length) {
                  modelClass &&
                    modelClass.addQuakeTag({
                      id: item?.id,
                      position: {
                        x: item?.x,
                        y: item?.y,
                        z: item?.z
                      },
                      seismSourceLevel: item?.seismSourceLevel,
                      seismSourceEnergy: item?.seismSourceEnergy
                    })
                }
              }, 0)
            } else {
              setTimeout(() => {
                if (window.Tmodel.scene.children.length) {
                  modelClass &&
                    modelClass.addTag({
                      id: item?.id,
                      typeId: item?.typeId,
                      position: {
                        x: item?.x,
                        y: item?.y,
                        z: item?.z
                      },
                      name: item?.name,
                      pointStatus: item?.pointStatus, // 水文测点数据状态
                      deviceStatus: item?.deviceStatus, // 水文设备通讯状态
                      useStatus: item?.useStatus, // 水文设备启用状态
                      emsDeviceStatus: item?.emsDeviceStatus // 电法主机通讯状态
                    })
                }
              }, 0)
            }
          })
      }
    }
  }, [sensorList2.length, window.Tmodel])

  const getControlValue = (val: string) => {
    modelClass.resizeDisplayGL()
    const actions: any = {
      big: () => modelClass.playZoomIncrease(),
      small: () => modelClass.playZoomDecrease(),
      translate: () => {
        modelClass.playTranslate()
      },
      rotate: () => {
        modelClass.playRotate()
      },
      select: () => {
        modelClass.playSelect()
        setIsShowOpacity(true)
        return
      },
      direct: () => {},
      reset: () => modelClass.playReset()
    }
    setIsShowOpacity(false)
    return actions[val]() ?? 'invalid value'
  }

  const getKey = (key: string) => {
    modelClass.playDirect(key)
  }


  const setOpacity = (val: number) => {
    setOpacityValue(val)
    modelClass?.setModelOpacity(val)
  }

  const setFirstOpacity = (value: number) => setOpacity(value)

  useImperativeHandle(props.onRef, () => {
    return {
      modelClass
    }
  })

  const setModelVisible = (id: string | number, status: boolean) => {
    modelClass.setModelAndSensorStatus(id, status)
  }

  // 根据name获取已经加载在场景中的模型或传感器
  const getModelByName = (name: string) => modelClass.getModelByName(name)

  useUnmount(() => killThreeModel())

  return (
    <>
      <div
        className='three-page'
        id='three'
        ref={Node}
        style={{
          height: props?.screen?.height,
          width: props?.screen?.width
        }}
      />
      {props.showControl ? (
        <Control
          sendValue={getControlValue}
          sendKey={getKey}
          toFullScreen={props.toFullScreen}
          toggleChart={props.toggleChart}
          isColor={isColor}
        />
      ) : null}

      {isShowOpacity ? (
        <Opacity getOpacity={setOpacity} opacity={opacity} />
      ) : null}

      <NodeList
        modelList={modelList}
        setModelVisible={setModelVisible}
        getModelByName={getModelByName}
      />

      <NodeList2 sensorList={sensorList} setModelVisible={setModelVisible} />

      {modalOpen ? (
        <SensorModal
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          selectedId={selectedId}
          selectedType={selectedType}
          selectedName={selectedName}
          data={sensorData}
          height={modalHeight}
          removeSensorClick={modelClass.removeSensorClick}
          restoreSensorClick={modelClass.restoreSensorClick}
        />
      ) : null}
    </>
  )
}
export default TM
