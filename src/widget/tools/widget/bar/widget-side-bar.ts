/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-13 16:28:52
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-13 17:08:24
 */
import barConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetSideBar',
	label: '间隙柱状图',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
		isShowBarSide: true,
		barSideHeight: 5,
		isBarSideLinear: false,
		barSideColor: '#0F375F',
		isShowBarSideBackground: true,
		barSideBackgroundColor: 'rgba(0, 151, 251, 0.1)',
		isBarSideBackgroundLinear: false
	}
};