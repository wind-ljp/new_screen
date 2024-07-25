/*
 * widget-alignment-bar组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-12 11:03:34
 */
import barConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetAlignmentBar',
	label: '坐标轴刻度与标签对齐',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
		xAxisAlignWithLabel: true
	}
};
