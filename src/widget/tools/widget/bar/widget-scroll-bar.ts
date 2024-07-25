/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-09-22 14:20:08
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-09-22 14:21:52
 */
import barConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetScrollBar',
	label: '区域缩放柱状图',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
    xAxisScroll: true,
		yAxisScroll: true
	}
};