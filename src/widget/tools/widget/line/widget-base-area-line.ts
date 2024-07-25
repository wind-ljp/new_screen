/*
 * widget-base-area-line组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-11 16:44:11
 */
import lineConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetBaseAreaLine',
	label: '基础面积图',
	...lineConfig,
	configureValue: {
		...lineConfig.configureValue,
		lineAreaStyle: true
	}
};
