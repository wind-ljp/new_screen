/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-09 14:11:04
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-09 14:54:25
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
				name: '图例',
				list: echarts.legend
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
			...animate.configure,
			{
				name: '单柱颜色配置',
				list: [
					{
						componentName: 'InputNumber',
						label: '系列一位置',
						min: 1,
						name: 'axis1Location',
						required: false
					},
					{
						componentName: 'SketchPicker',
						label: '系列一颜色',
						name: 'axis1Color',
						required: false
					},
					{
						componentName: 'InputNumber',
						label: '系列二位置',
						min: 1,
						name: 'axis2Location',
						required: false
					},
					{
						componentName: 'SketchPicker',
						label: '系列二颜色',
						name: 'axis2Color',
						required: false
					},
					{
						componentName: 'InputNumber',
						label: '系列三位置',
						min: 1,
						name: 'axis3Location',
						required: false
					},
					{
						componentName: 'SketchPicker',
						label: '系列三颜色',
						name: 'axis3Color',
						required: false
					}
				]
			}
		]
	],
	data: data.configure
};

export default bar;