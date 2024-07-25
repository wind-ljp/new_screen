/*
 * widget-base-text组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 14:18:50
 */
import baseConfiguration from '../../base-configuration';
const { font, animate, data, box } = baseConfiguration;

const temp = {
	code: 'widgetBaseText',
	type: 'text',
	label: '基础文本',
	// 配置项值
	configureValue: {
		styleDisplay: 'block',
		styleTextShadowX: 0,
		styleTextShadowY: 0,
		styleTextShadowF: 0,
		styleTextShadowC: '',
		...box.configureValue,
		...animate.configureValue,
		...font.configureValue
	},
	// 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 100,
		height: 40
	},
	// 数据值
	dataValue: data.configureValue
}

export default temp;
