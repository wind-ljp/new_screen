/*
 * widget-annulus-pie组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-12 17:43:10
 */
import picConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetAnnulusPie',
	label: '环形图',
	...picConfig,
	configureValue: {
		...picConfig.configureValue,
		seriesInsideRadius: 40,
		seriesAutsideRadius: 80
	},
	dataValue: picConfig.dataValue
};
