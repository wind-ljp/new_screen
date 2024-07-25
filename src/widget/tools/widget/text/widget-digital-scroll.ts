/*
 * widget-digital-scroll组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 17:37:56
 */
import baseConfiguration from '../../base-configuration';
const { scrollfont, data, box } = baseConfiguration;

const temp = {
	code: 'widgetDigitalScroll',
	type: 'text',
	label: '数字滚动',
	// 配置项值
	configureValue: {
		styleDisplay: 'block',
		styleTextShadowX: 0,
		styleTextShadowY: 0,
		styleTextShadowF: 0,
		styleTextShadowC: '',
		...scrollfont.configureValue,
		...box.configureValue,
		styleColor: '#fc97af',
		styleWidth: 50,
		styleHeight: 50,
		styleBorderBottomLeftRadius: 5,
		styleBorderBottomRightRadius: 5,
		styleBorderColor: '#fc97af',
		styleBorderStyle: 'solid',
		styleBorderTopLeftRadius: 5,
		styleBorderTopRightRadius: 5,
		styleBorderWidth: 1,
		styleBoxInset: true,
		styleBoxShadowC: '#fc97af',
		styleBoxShadowF: 5,
		styleBoxShadowX: 0,
		styleBoxShadowY: 0
	},
	// 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 800,
		height: 50
	},
	// 数据值
	dataValue: {
		...data.configureValue,
		mock: {
			data: 66666
		}
	}
};

export default temp;
