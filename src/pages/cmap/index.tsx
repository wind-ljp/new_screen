/*
 * @Descripttion: 地图-leaflet封装
 * @Author: liaojp
 * @CreatedDate: Do not Edit
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:37:20
 */
import React, { useEffect } from 'react'
import './index.scss'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import defaultImg from '../../assets/image/common/newark_nj_1922.jpg'

type AppProps = {
  isConfig: boolean
  screen: IScreen
}

const App: React.FC<AppProps> = ({ isConfig, screen }) => {
  useEffect(() => {
    const mymap = L.map('map', {
      minZoom: 5,
      maxZoom: 14,
      keyboard: false
    }).setView(
      screen?.center
        ? [
            parseFloat(screen.center.split(',')[1]),
            parseFloat(screen.center.split(',')[0])
          ]
        : [35.21645, 106.60034],
      14
    )

    L.TileLayer.Custom = L.TileLayer.extend({
      getTileUrl: (coords: { z: number; x: number; y: number }) =>
        `/map/${coords.z}/${coords.x}/${coords.y}.jpg`
    })
    L.tileLayer.Custom = () => new L.TileLayer.Custom()
    L.tileLayer.Custom().addTo(mymap)

    let pStart
    let pEnd
    if (screen.location1) {
      pStart = [
        screen.location1.split(',')[1],
        screen.location1.split(',')[0]
      ].map((i) => parseFloat(i))
    }
    if (screen.location2) {
      pEnd = [
        screen.location2.split(',')[1],
        screen.location2.split(',')[0]
      ].map((i) => parseFloat(i))
    }

    const imageUrl = screen.chartlet ? screen.chartlet : defaultImg,
      imageBounds = [pStart, pEnd]

    if (pStart && pEnd && screen?.showPic) {
      L.imageOverlay(imageUrl, imageBounds).addTo(mymap)
    }

    L.control
      .scale({
        imperial: false
      })
      .addTo(mymap)

    const list = JSON.parse(screen?.setMapArea as string) || null

    if (screen?.showArea && list && list.length) {
      const areaLayer = L.geoJson(
        {
          type: 'FeatureCollection',
          features: list.map(
            (item: {
              unitName: string
              coordList: number[][]
              id: number
              fontSize: number
              agencyId: number
            }) => {
              return {
                type: 'Feature',
                properties: {
                  name: item.unitName
                },
                geometry: {
                  coordinates: [item.coordList],
                  type: 'Polygon'
                },
                id: item.id,
                fontSize: item.fontSize || 15,
                agencyId: item.agencyId
              }
            }
          )
        },
        {
          onEachFeature: function (
            feature: {
              id: number | string
              agencyId: number
              fontSize: number
              properties: { name: string }
            },
            layer: {
              getBounds: () => any
              on: (arg0: string, arg1: () => void) => void
            }
          ) {
            const center = L.latLngBounds(layer.getBounds()).getCenter()
            L.marker(center, {
              icon: L.divIcon({
                className: 'label-icon',
                html: `<div onclick="window.open('/#/frame/preview?id=${feature.id}&agencyId=${feature.agencyId}', '_blank')" style="font-size: ${feature.fontSize}px;
                font-weight: bold;transform: translate(-50%, -50%);">${feature.properties.name}</div>`,
                iconSize: null
              })
            }).addTo(mymap)
            layer.on('click', function () {
              window.open(
                `/#/frame/preview?id=${feature.id}&agencyId=${feature.agencyId}`,
                '_blank'
              )
            })
          }
        }
      )
      areaLayer.addTo(mymap)
      const bounds = areaLayer.getBounds()
      mymap.fitBounds(bounds)

      // mymap.on('zoomend', () => {
      //   const currentZoom = mymap.getZoom()
      //   const fontSize = currentZoom * 2
      //   const textElements = document.getElementsByClassName(
      //     'leaflet-marker-icon'
      //   )
      //   for (const textElement of textElements) {
      //     textElement.style.fontSize = `${fontSize}px`;
      //   }
      // })
    }
  }, [])

  return (
    <div
      id='map'
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: '0px',
        zIndex: '-1'
      }}></div>
  )
}

export default App
