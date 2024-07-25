/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-09-27 15:31:49
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-09-27 16:21:37
 */
import config from './index'
import baseConfiguration from '../../base-configuration'
const { echarts } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'widgetRoundBar',
	label: '圆角环形图',
  ...config,
  configureValue: {
		...config.configureValue,
		...echarts.legendValue
	},
	dataValue: {
		...config.dataValue,
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
}