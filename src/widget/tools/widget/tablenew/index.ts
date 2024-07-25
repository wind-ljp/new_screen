/*
 * @Author: liaojingping
 * @Date: 2023-01-13 10:47:07
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 10:16:37
 * @FilePath: \BigScreenWebFE\src\widget\tools\widget\tablenew\index.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'tablenew',
  // 默认配置项
  configureValue: {
    styleDisplay: 'block'
  },
  // 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 467,
		height: 266
	},
  // 数据值
	dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {
			data: {
        body: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ],
        header: ['列1', '列2', '列3']
      }
		},
    initData: {
      rowNum: 5,
      headerBGC: '#00BAFF',
      oddRowBGC: '#003B51',
      evenRowBGC: '#0A2732',
      waitTime: 2000,
      headerHeight: 45,
      columnWidth1: 55,
      columnWidth2: 200,
      columnWidth3: 200,
      columnWidth4: 200,
      columnWidth5: 200,
      columnWidth6: 200,
      columnWidth7: 200,
      columnWidth8: 200,
      columnWidth9: 200,
      columnWidth10: 200,
      align: [],
      carousel: 'single',
      hoverPause: true,
      index: true,
      indexHeader: '#'
    }
	}
}