/*
 * bar类型的配置
 * @Author:  liaojp
 * @Date: 2022-08-10 09:57:10
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 17:13:24
 */
import baseConfiguration from '../base-configuration';
const { echarts, animate, data } = baseConfiguration;

const bar = {
	configure: [
		[
			{
				name: '柱状设置',
				list: [...echarts.seriesStack, ...echarts.bar, echarts.seriesLabel]
			},
			{
				name: '间隙设置',
				list: [
					{
						componentName: 'Switch',
						label: '间隙',
						name: 'isShowBarSide',
						required: false
					},
					{
						componentName: 'InputNumber',
						label: '间隙高度',
						name: 'barSideHeight',
						required: false,
						relationFields: 'isShowBarSide',
						relationValues: 'true'
					},
					{
						componentName: 'SketchPicker',
						label: '间隔颜色',
						name: 'barSideColor',
						required: false,
						relationFields: 'isShowBarSide',
						relationValues: 'true'
					},
					{
						componentName: 'Switch',
						label: '是否渐变',
						name: 'isBarSideLinear',
						required: false,
						relationFields: 'isShowBarSide',
						relationValues: 'true'
					},
					{
						componentName: 'LinearColorPicker',
						label: '间隔颜色',
						name: 'barSideLinearColor',
						required: false,
						placeholder: '请选择颜色',
						relationFields: 'isBarSideLinear',
						relationValues: 'true'
					},
					{
						componentName: 'Switch',
						label: '背景',
						name: 'isShowBarSideBackground',
						required: false
					},
					{
						componentName: 'SketchPicker',
						label: '背景颜色',
						name: 'barSideBackgroundColor',
						required: false,
						relationFields: 'isShowBarSideBackground',
						relationValues: 'true'
					},
					{
						componentName: 'Switch',
						label: '是否渐变',
						name: 'isBarSideBackgroundLinear',
						required: false,
						relationFields: 'isShowBarSideBackground',
						relationValues: 'true'
					},
					{
						componentName: 'LinearColorPicker',
						label: '间隔颜色',
						name: 'barSideBackgroundLinearColor',
						required: false,
						placeholder: '请选择颜色',
						relationFields: 'isBarSideBackgroundLinear',
						relationValues: 'true'
					}
				]
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
			...animate.configure
		]
	],
	data: data.configure
};

export default bar;
