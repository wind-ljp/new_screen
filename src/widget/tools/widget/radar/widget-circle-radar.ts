/*
 * widget-circle-radar组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-14 11:11:12
 */
import radarConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetCircleRadar',
	label: '圆形雷达图',
	...radarConfig,
	configureValue: {
		...radarConfig.configureValue,
		radarShape: 'circle'
	}
};
