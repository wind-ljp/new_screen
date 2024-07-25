/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-09 14:04:49
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-09 14:53:51
 */
import barConfig from '../bar/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetOneColorBar',
	label: '单柱颜色柱状图',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
		axis1Location: 1,
		axis1Color: '#900',
		axis2Location: 2,
		axis2Color: '#900',
		axis3Location: 3,
		axis3Color: '#900'
	}
};