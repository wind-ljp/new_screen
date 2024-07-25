/*
 * @Description: widgetPadAnglePie 扇区间隙
 * @Author: liaojingping
 * @Date: 2024-06-04 15:42:13
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-04 15:50:58
 */
import picConfig from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetPadAnglePie',
	label: '扇区间隙饼图',
	...picConfig,
	configureValue: {
		...picConfig.configureValue,
		seriesInsideRadius: 40,
		seriesAutsideRadius: 80,
    seriesIsPadAngle: true,
    seriesPadAngle: 5
	},
	dataValue: picConfig.dataValue
};