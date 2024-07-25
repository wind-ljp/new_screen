/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-09-21 15:57:07
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-09-21 16:37:39
 */
import lineConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetBaseSmoothLine',
	label: '区域缩放折线图',
	...lineConfig,
	configureValue: {
		...lineConfig.configureValue,
		xAxisScroll: true,
		yAxisScroll: true
	}
};