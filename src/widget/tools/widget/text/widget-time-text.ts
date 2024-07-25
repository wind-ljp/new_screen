/*
 * widget-time-text组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 15:12:19
 */
import baseConfiguration from '../../base-configuration';
const { timefont, data } = baseConfiguration;

const temp = {
	code: 'widgetTimeText',
	type: 'text',
	label: '时间文本',
	// 配置项值
	configureValue: {
		styleDisplay: 'block',
		styleTextShadowX: 0,
		styleTextShadowY: 0,
		styleTextShadowF: 0,
		styleTextShadowC: '',
		...timefont.configureValue,
		fmtDate: 'yyyy-MM-dd hh:mm:ss',
		styleColor: 'orange'
	},
	// 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 300,
		height: 40
	},
	// 数据值
	dataValue: data.configureValue
};

export default temp;
