/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-05-21 13:39:57
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-05-21 13:42:42
 */
import baseConfiguration from '../../base-configuration';
const { echarts, animate, data } = baseConfiguration;

const linebar = {
  configure: [
    [
      {
        name: '柱状设置',
        list: [...echarts.seriesStack, ...echarts.bar, echarts.seriesLabel]
      },
      {
        name: '折线设置',
        list: [
          ...echarts.line,
          echarts.seriesLabel,
          echarts.symbol,
          ...echarts.seriesStack
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

export default linebar