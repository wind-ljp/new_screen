/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: liaojingping
 * @Date: 2023-01-13 10:39:13
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:25:20
 * @FilePath: \配置大屏\src\widget\tablenew\widget-basic-table\index.tsx
 * @Description: 表格组件
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import ScrollBoard from '@jiaminghi/data-view-react/es/scrollBoard'
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC, useState, useEffect } from 'react'
import { getStyles } from '../../../utils/tools'
import { notification } from 'antd'
import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'ahooks'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const TableNew: FC<ITableProps> = ({
  data = {},
  field = 'data',
  options
}) => {
  const { dataValue } = options
  const [newData, setNewData] = useState(data)
  const location = useLocation()
  useEffect(() => {
    let intervalId: any

    const fetchData = async () => {
      try {
        let response: any

        if (dataValue.method === 'get') {
          response = await get({
            url: dataValue.url,
            loading: true,
            params: dataValue.params
          })
        } else if (dataValue.method === 'post') {
          response = await post({
            url: dataValue.url,
            loading: true,
            data: dataValue.params
          })
        }

        setNewData(response)
      } catch (error) {
        console.error(error)
      }
    }

    if (
      location.pathname === '/frame/preview' &&
      dataValue.autoTime &&
      dataValue.dataType === 'dynamic'
    ) {
      intervalId = setInterval(fetchData, dataValue.autoTime)
    } else {
      setNewData(data)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    location.pathname,
    dataValue,
    (prevDataValue: any) =>
      JSON.stringify(prevDataValue) === JSON.stringify(dataValue)
  ])

  const [config, setConfig] = useState<IAnyObject>({
    header: [],
    data: [],
    columnWidth: [55, 200, 200, 200, 200, 200, 200, 200, 200, 200],
    waitTime: 2000,
    rowNum: 5,
    headerHeight: 45,
    headerBGC: '#00BAFF',
    oddRowBGC: '#003B51',
    evenRowBGC: '#0A2732',
    hoverPause: true,
    index: true,
    indexHeader: '#'
  })

  useEffect(() => {
    const tempData: IAnyObject = { ...config }
    tempData.data = newData[field]?.body ?? []
    tempData.header = newData[field]?.header ?? []
    if (options?.waitTime) {
      tempData.waitTime = options?.waitTime
    }
    if (options?.rowNum) {
      tempData.rowNum = options?.rowNum
    }
    if (options?.headerHeight) {
      tempData.headerHeight = options?.headerHeight
    }
    if (options?.headerBGC) {
      tempData.headerBGC = options?.headerBGC
    }
    if (options?.oddRowBGC) {
      tempData.oddRowBGC = options?.oddRowBGC
    }
    if (options?.evenRowBGC) {
      tempData.evenRowBGC = options?.evenRowBGC
    }
    if (typeof options?.hoverPause === 'boolean') {
      tempData.hoverPause = options?.hoverPause
    }
    if (typeof options?.index === 'boolean') {
      tempData.index = options?.index
    }
    if (options?.indexHeader) {
      tempData.indexHeader = options?.indexHeader
    }
    // 列宽
    if (options?.columnWidth1) {
      tempData.columnWidth[0] = options?.columnWidth1
      delete options.columnWidth1
    }
    if (options?.columnWidth2) {
      tempData.columnWidth[1] = options?.columnWidth2
      delete options.columnWidth2
    }
    if (options?.columnWidth3) {
      tempData.columnWidth[2] = options?.columnWidth3
      delete options.columnWidth3
    }
    if (options?.columnWidth4) {
      tempData.columnWidth[3] = options?.columnWidth4
      delete options.columnWidth4
    }
    if (options?.columnWidth5) {
      tempData.columnWidth[4] = options?.columnWidth5
      delete options.columnWidth5
    }
    if (options?.columnWidth6) {
      tempData.columnWidth[5] = options?.columnWidth6
      delete options.columnWidth6
    }
    if (options?.columnWidth7) {
      tempData.columnWidth[6] = options?.columnWidth7
      delete options.columnWidth7
    }
    if (options?.columnWidth8) {
      tempData.columnWidth[7] = options?.columnWidth8
      delete options.columnWidth8
    }
    if (options?.columnWidth9) {
      tempData.columnWidth[8] = options?.columnWidth9
      delete options.columnWidth9
    }
    if (options?.columnWidth10) {
      tempData.columnWidth[8] = options?.columnWidth9
      delete options.columnWidth9
    }
    setConfig(tempData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData, field, options])
  return (
    <ScrollBoard
      style={getStyles(options)}
      config={config}
      onClick={(event: any) => {
        return notification.open({
          message: `第${event.rowIndex + 1}行第${event.columnIndex + 1}列`,
          description: event.ceil,
          className: 'custom-class',
          style: {
            width: 600
          }
        })
      }}
    />
  )
}
export default TableNew
