/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-10 15:28:07
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-10 15:44:39
 */
import baseConfiguration from '../../base-configuration';
const { echarts, animate, data } = baseConfiguration;

const polarline = {
	configure: [
		{
			componentName: 'InputNumber',
			label: '起始角度',
			name: 'startAngleLine',
			required: false,
			min: 0,
			tooltip: '起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。'
		},
		[
			{
				name: '标题',
				list: echarts.title
			},
			{
				name: '图例',
				list: echarts.legend
			},
			{
				name: '网格',
				list: echarts.grid
			},
			{
				name: '自定义颜色',
				list: echarts.echartColor
			},
			...animate.configure
		]
	],
	data: data.configure
};

export default polarline;