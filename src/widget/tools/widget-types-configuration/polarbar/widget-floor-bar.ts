/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-09 16:16:11
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-09 16:17:50
 */
import baseConfiguration from '../../base-configuration';
const { echarts, animate, data } = baseConfiguration;

const bar = {
	configure: [
		[
			{
				name: '柱状设置',
				list: [...echarts.seriesStack, ...echarts.bar, echarts.seriesLabel]
			},
			{
				name: '标题',
				list: echarts.title
			},
			{
				name: '网格',
				list: echarts.grid
			},
			{
				name: 'X轴',
				list: echarts.xAxis
			},
			{
				name: 'y轴',
				list: echarts.yAxis
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

export default bar;