/*
 * widget-base-smooth-line组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-11 16:42:30
 */
import lineConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetBaseSmoothLine',
	label: '基础平滑折线图',
	...lineConfig,
	configureValue: {
		...lineConfig.configureValue,
		lineSmooth: true
	}
};
