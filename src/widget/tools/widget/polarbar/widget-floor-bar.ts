/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-09 16:11:40
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-09 16:22:26
 */
import barConfig from '../bar/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetFloorBar',
	label: '瀑布图',
	...barConfig,
	configureValue: {
		...barConfig.configureValue,
		seriesStackValue: 'Total',
		seriesLabelShow: true,
		seriesLabelPosition: 'inside',
		seriesLabelColor: '#fff'
	},
	dataValue: {
		...barConfig.dataValue,
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
					],
					hidden: true
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