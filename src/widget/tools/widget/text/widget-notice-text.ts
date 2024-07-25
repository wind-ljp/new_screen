/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-13 11:29:50
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-13 13:36:40
 */
import baseConfiguration from '../../base-configuration';
const { font, animate, data, box } = baseConfiguration;

const noticeText = {
	code: 'widgetNoticeText',
	type: 'text',
	label: '竖向单切换文本',
	// 配置项值
	configureValue: {
		styleDisplay: 'block',
		styleTextShadowX: 0,
		styleTextShadowY: 0,
		styleTextShadowF: 0,
		styleTextShadowC: '',
		...box.configureValue,
		...animate.configureValue,
		...font.configureValue,
		noticeDelay: 2500
	},
	// 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 300,
		height: 30
	},
	// 数据值
	dataValue: {
    ...data.configureValue,
    field: 'data',
    mock: {
      data: [
        '福州华虹智能科技',
        '透明化管控平台'
      ]
    }
  }
}

export default noticeText;
