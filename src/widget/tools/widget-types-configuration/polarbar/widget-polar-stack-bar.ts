/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-09-27 14:05:18
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-09-27 15:52:38
 */
import baseConfiguration from '../../base-configuration'
const { echarts, animate, data } = baseConfiguration

const polarbar = {
  configure: [
    {
			componentName: 'InputNumber',
			label: '起始角度',
			name: 'startAngle',
			required: false,
			min: 0,
      tooltip: '起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。'
		},
    {
			componentName: 'Switch',
			label: '是否堆叠',
			name: 'polarStack',
			required: false
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
}

export default polarbar
