/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-07 13:41:34
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-07 14:49:03
 */
import baseConfiguration from '../../base-configuration'
const { data, animate } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'decoration',
  // 默认配置项
  configureValue: {
    styleDisplay: 'block',
    ...animate.configureValue
  },
  dataValue: {
		...data.configureValue
	}
}