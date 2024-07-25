/*
 * @Description: 多类型混合
 * @Author: liaojingping
 * @Date: 2024-05-21 13:26:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-05-22 13:58:42
 */
import barConfig from '../bar/index';
import lineConfig from '../line/index';
import config from './index';
import baseConfiguration from '../../base-configuration';
const { echarts, animate, data } = baseConfiguration;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetMixLineBar',
	label: '多类型混合',
	...config,
	...lineConfig,
	...barConfig,
	configureValue: {
		styleDisplay: 'block',
		...animate.configureValue,
		...echarts.titleValue,
		...echarts.legendValue,
		...echarts.gridValue,
		...echarts.xAxisValue,
		...echarts.yAxisValue,
		...echarts.echartColorValue,
		...echarts.lineValue,
		...echarts.seriesLabel,
		...echarts.seriesStackValue,
		...echarts.symbolValue,
		...echarts.barValue,
		...echarts.seriesLabelValue,
		xAxisBoundaryGap: false,
		yAxisBoundaryGap: false
	},
	dataValue: {
		...lineConfig.dataValue,
		...barConfig.dataValue,
		mock: {
			data: [
				{
					type: 'bar',
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
					type: 'line',
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