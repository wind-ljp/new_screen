/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:50:52
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 10:13:24
 */
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'border',
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
  dataValue: {
		...data.configureValue
	}
}