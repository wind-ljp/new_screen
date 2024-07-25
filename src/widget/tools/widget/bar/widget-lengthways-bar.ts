/*
 * widget-lengthways-bar组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-12 11:15:18
 */
import barConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetLengthwaysBar',
	label: '横向柱状图',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
		barWidth: 15,
		barBorderRadius: 20,
		xAxisType: 'value',
		yAxisType: 'category'
	}
};
