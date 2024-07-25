/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-09-27 13:51:52
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 10:15:56
 */
import baseConfiguration from '../../base-configuration'
const { data, animate, echarts } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'polarbar',
  configureValue: {
    styleDisplay: 'block',
    ...animate.configureValue,
    ...echarts.titleValue,
    ...echarts.gridValue,
    ...echarts.echartColorValue,
    ...echarts.seriesLabelValue,
    startAngle: 75,
    polarF: 30,
    polarS: '80%'
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
      data: [
        {
          seriesName: 'Email',
          data: [
            {
              name: 'Mon',
              value: 120
            },
            {
              name: 'Tue',
              value: 132
            },
            {
              name: 'Wed',
              value: 101
            },
            {
              name: 'Thu',
              value: 134
            },
            {
              name: 'Fri',
              value: 90
            },
            {
              name: 'Sat',
              value: 230
            },
            {
              name: 'Sun',
              value: 210
            }
          ]
        }
      ]
    }
  }
}
