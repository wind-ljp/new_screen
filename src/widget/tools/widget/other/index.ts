/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-02-06 14:33:17
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-12 10:15:38
 */
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'other',
  // 默认配置项
  configureValue: {
    styleDisplay: 'block'
  },
  // 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 48,
		height: 48
	},
  dataValue: {
		...data.configureValue
	}
}