/*
 * widget-base-pie组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-12 17:35:25
 */
import picConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetBasePie',
	label: '基础饼图',
	...picConfig,
	configureValue: {
		...picConfig.configureValue
	},
	dataValue: picConfig.dataValue
};
