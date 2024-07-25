/*
 * @Author: liaojingping
 * @Date: 2023-03-15 11:48:03
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 10:17:24
 * @FilePath: \配置大屏\src\widget\tools\widget\wordcloud\index.ts
 * @Description: 
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
/*
 * widget-wordcloud组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-18 10:07:26
 */
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'wordcloud',
  // 配置项值
  configureValue: {
    styleDisplay: 'block',
    wordcloudFontFamily: 'SimSun',
    wordcloudFontWeight: 'bold',
    wordcloudGridSize: 0,
    wordcloudMaxFontSize: 32
  },
  // 坐标值
  coordinateValue: {
    left: 821,
    top: 365,
    width: 467,
    height: 346
  },
  // 数据值
  dataValue: {
    ...data.configureValue,
    field: 'data',
    mock: {
      data: [
        {
          seriesName: '测试',
          data: [
            {
              name: '数据可视化',
              value: 3000
            },
            {
              name: '大数据',
              value: 2181
            },
            {
              name: '云计算',
              value: 1386
            },
            {
              name: '物联网',
              value: 2055
            },
            {
              name: '移动互联网',
              value: 2467
            },
            {
              name: '人工智能',
              value: 2244
            },
            {
              name: '深度学习',
              value: 1898
            },
            {
              name: '机器学习',
              value: 1484
            },
            {
              name: '区块链',
              value: 3865
            },
            {
              name: '互联网+',
              value: 2222
            },
            {
              name: '智能合约',
              value: 366
            },
            {
              name: '比特币',
              value: 360
            },
            {
              name: '数据挖掘',
              value: 273
            }
          ]
        }
      ]
    }
  }
}
