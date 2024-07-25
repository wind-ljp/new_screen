/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-09-27 14:05:18
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-09-27 16:27:48
 */
import baseConfiguration from '../../base-configuration'
const { echarts, animate, data } = baseConfiguration

const polarbar = {
  configure: [
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
