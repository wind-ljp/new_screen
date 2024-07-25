/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-12 10:53:44
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 14:39:12
 */
import baseConfiguration from '../../base-configuration'
const { animate, data } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'image',
  // 配置项值
  configureValue: {
    styleDisplay: 'block',
    ...animate.configureValue
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
      data: '/img.png'
    }
  }
}