/*
 * @Descripttion: 地图
 * @Author: liaojp
 * @CreatedDate: Do not Edit
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:38:49
 */
import { IAnyObject } from '../../types';
import './index.scss'
import { useEffect } from 'react'

const App = (props: { isConfig: boolean; screen: IAnyObject }) => {
  if (props.isConfig) {
    // 配置页
    useEffect(() => {
      const map = new window.BMapGL.Map('map-container')
      const center = props.screen.center
        ? props.screen.center
        : '117.2, 36.2437'
      map.centerAndZoom(
        new window.BMapGL.Point(center.split(',')[0], center.split(',')[1]),
        18
      )
      map.enableScrollWheelZoom(true)
      // map.setTilt(45) // 倾斜
      map.setDisplayOptions({
        poiText: false,
        poiIcon: false,
        building: false
      })
      map.setMapStyleV2({
        styleId: '0ee2efe64124eb11686018b040a62ebb'
      })
      const location1 = props.screen.location1
        ? props.screen.location1
        : '117.19635, 36.24093'
      const location2 = props.screen.location2
        ? props.screen.location2
        : '117.2035, 36.24764'
      const pStart = new window.BMapGL.Point(
        location1.split(',')[0],
        location1.split(',')[1]
      )
      const pEnd = new window.BMapGL.Point(
        location2.split(',')[0],
        location2.split(',')[1]
      )
      const bounds = new window.BMapGL.Bounds(
        new window.BMapGL.Point(pStart.lng, pEnd.lat),
        new window.BMapGL.Point(pEnd.lng, pStart.lat)
      )
      const chartlet = props.screen.chartlet ? props.screen.chartlet : ''
      const imgOverlay = new window.BMapGL.GroundOverlay(bounds, {
        type: 'image',
        url: chartlet,
        opacity: 1
      })
      if (chartlet) {
        map.addOverlay(imgOverlay)
      }
    }, [
      props.screen.center,
      props.screen.location1,
      props.screen.location2,
      props.screen.chartlet
    ])
  } else {
    // 预览页
    useEffect(() => {
      const map = new window.BMapGL.Map('map-container')
      const center = props.screen.center
        ? props.screen.center
        : '117.2, 36.2437'
      map.centerAndZoom(
        new window.BMapGL.Point(center.split(',')[0], center.split(',')[1]),
        18
      )
      map.enableScrollWheelZoom(true)
      // map.setTilt(45) // 倾斜
      map.setDisplayOptions({
        poiText: false,
        poiIcon: false,
        building: false
      })
      map.setMapStyleV2({
        styleId: '0ee2efe64124eb11686018b040a62ebb'
      })
      const location1 = props.screen.location1
        ? props.screen.location1
        : '117.19635, 36.24093'
      const location2 = props.screen.location2
        ? props.screen.location2
        : '117.2035, 36.24764'
      const pStart = new window.BMapGL.Point(
        location1.split(',')[0],
        location1.split(',')[1]
      )
      const pEnd = new window.BMapGL.Point(
        location2.split(',')[0],
        location2.split(',')[1]
      )
      const bounds = new window.BMapGL.Bounds(
        new window.BMapGL.Point(pStart.lng, pEnd.lat),
        new window.BMapGL.Point(pEnd.lng, pStart.lat)
      )
      const chartlet = props.screen.chartlet ? props.screen.chartlet : ''
      const imgOverlay = new window.BMapGL.GroundOverlay(bounds, {
        type: 'image',
        url: chartlet,
        opacity: 1
      })
      if (chartlet) {
        map.addOverlay(imgOverlay)
      }
    }, [
      props.screen.center,
      props.screen.location1,
      props.screen.location2,
      props.screen.chartlet
    ])
  }

  return (
    <div
      id='map-container'
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: '0px',
        zIndex: '-1'
      }}
    />
  )
}

export default App
