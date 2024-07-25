/*
 * widget-text组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 16:13:40
 */
import baseConfiguration from '../base-configuration'
const { font, animate, data, box } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'widgetImage',
  type: 'image',
  label: '图片',
  // 配置项值
  configureValue: {
    styleDisplay: 'block',
    display: 'block',
    ...animate.configureValue
  },
  // 坐标值
  coordinateValue: {
    left: 0,
    top: 0,
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
