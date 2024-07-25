/*
 * widget-time-text类型的配置
 * @Author:  liaojp
 * @Date: 2022-08-10 09:57:10
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 11:10:51
 */
import baseConfiguration from '../../base-configuration';
const { timefont } = baseConfiguration;

const widgetTimeText = {
	// 基础配置项
	configure: [
		{
			componentName: 'Input',
			label: '自定义格式',
			name: 'fmtDate',
			required: false,
			placeholder: ''
		},
		...timefont.configure
	]
};

export default widgetTimeText;
