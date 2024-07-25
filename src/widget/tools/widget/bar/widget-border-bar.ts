/*
 * @Description: 描边柱状图
 * @Author: liaojingping
 * @Date: 2024-06-06 17:04:36
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-07 09:00:07
 */
import barConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetBorderBar',
	label: '描边柱状图',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
		barBorderShow: true,
		barBorderShowRadius: 5,
		barBorderShowWidth: 1,
		barBorderShowColor: '#73c0de',
		barBorderShowType: 'solid',
		barShadowShowBlur: 3,
		barShadowShowColor: '#5470c6'
	}
};