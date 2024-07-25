/*
 * widget-base-line组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 16:12:46
 */
import baseConfiguration from '../../base-configuration';
const { echarts, animate, data } = baseConfiguration;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	type: 'bar',
	// 配置项值
	configureValue: {
		styleDisplay: 'block',
		...animate.configureValue,
		...echarts.titleValue,
		...echarts.legendValue,
		...echarts.gridValue,
		...echarts.xAxisValue,
		...echarts.yAxisValue,
		...echarts.echartColorValue,
		...echarts.barValue,
		...echarts.seriesLabelValue,
		...echarts.seriesStackValue,
		xAxisBoundaryGap: true,
		yAxisBoundaryGap: false,
		barBorderShow: false,
		barBorderShowRadius: 5,
		barBorderShowWidth: 1,
		barBorderShowColor: '#73c0de',
		barBorderShowType: 'solid',
		barShadowShowBlur: 3,
		barShadowShowColor: '#5470c6',
		isShowBarSide: false,
		barSideHeight: 5,
		isBarSideLinear: false,
		barSideColor: '#0F375F',
		isShowBarSideBackground: false,
		barSideBackgroundColor: 'rgba(0, 151, 251, 0.1)',
		isBarSideBackgroundLinear: false,
		barSideLinearColor: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
		barSideBackgroundLinearColor: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ]
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
				}
			]
		}
	}
};
