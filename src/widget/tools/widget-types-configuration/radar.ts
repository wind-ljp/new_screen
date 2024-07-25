/*
 * radar类型的配置
 * @Author:  liaojp
 * @Date: 2022-08-10 09:57:10
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-14 11:43:13
 */
import baseConfiguration from '../base-configuration';
const { echarts, animate, data } = baseConfiguration;

const radar = {
	configure: [
		[
			{
				name: '雷达设置',
				list: [...echarts.radar, echarts.symbol]
			},
			{
				name: '标题',
				list: echarts.title
			},
			{
				name: '图例',
				list: echarts.legend
			}
		],
		echarts.echartColor[echarts.echartColor.length - 1],
		animate.configure
	],
	data: data.configure
};

export default radar;
