/*
 * widget-base-line组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 16:13:11
 */
import baseConfiguration from '../../base-configuration';
const { echarts, animate, data } = baseConfiguration;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	type: 'radar',
	// 配置项值
	configureValue: {
		styleDisplay: 'block',
		...animate.configureValue,
		...echarts.titleValue,
		...echarts.legendValue,
		...echarts.echartColorValue,
		...echarts.radarValue,
		...echarts.seriesLabelValue,
		...echarts.symbolValue,
		xAxisShow: false,
		yAxisShow: false,
		xAxisType: 'category',
		yAxisType: 'value'
	},
	// 坐标值
	coordinateValue: {
		left: 821,
		top: 365,
		width: 467,
		height: 346
	},
	// 数据值
	dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {
			data: [
				{
					seriesName: 'Email',
					data: [
						{
							name: 'Mon',
							value: 120
						},
						{
							name: 'Tue',
							value: 132
						},
						{
							name: 'Wed',
							value: 101
						},
						{
							name: 'Thu',
							value: 134
						},
						{
							name: 'Fri',
							value: 90
						},
						{
							name: 'Sat',
							value: 230
						},
						{
							name: 'Sun',
							value: 210
						}
					]
				},
				{
					seriesName: 'Direct',
					data: [
						{
							name: 'Mon',
							value: 220
						},
						{
							name: 'Tue',
							value: 182
						},
						{
							name: 'Wed',
							value: 191
						},
						{
							name: 'Thu',
							value: 234
						},
						{
							name: 'Fri',
							value: 290
						},
						{
							name: 'Sat',
							value: 330
						},
						{
							name: 'Sun',
							value: 310
						}
					]
				}
			]
		}
	}
};
