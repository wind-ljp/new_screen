/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-10-08 14:04:00
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-09 10:37:39
 */
import config from './index'
import baseConfiguration from '../../base-configuration'
const { echarts } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'widgetThreeBar',
  label: '3D柱状图',
  ...config,
  configureValue: {
    ...config.configureValue,
    ...echarts.legendValue,
    axis3LabelColor: '#900',
    axis3TextColor: '#900',
    x3Name: 'X',
    y3Name: 'Y',
    z3Name: 'Z',
    g3Max: 5000,
    axis2Status: true
  },
  dataValue: {
    ...config.dataValue,
    mock: {
      data: [
        ['Income', 'Life Expectancy', 'Population'],
        [815, 34.05, 3510],
        [1314, 39, 6455],
        [985, 32, 3216],
        [864, 32.2, 3450]
      ]
    }
  }
}
