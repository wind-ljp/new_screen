/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-05-29 13:42:37
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 10:15:20
 */
import baseConfiguration from '../../base-configuration'
const { data, animate } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'guage',
  // 默认配置项
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
  dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {
			data: []
		}
	}
}