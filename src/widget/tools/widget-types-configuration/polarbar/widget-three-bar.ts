/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-10-08 14:06:10
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-09 10:37:25
 */
import baseConfiguration from '../../base-configuration'
const { echarts, animate, data } = baseConfiguration

const polarbar = {
  configure: [
    {
			componentName: 'Switch',
			label: '是否显示轴',
			name: 'axis2Status',
			required: false
    },
    {
      componentName: 'SketchPicker',
      label: '轴标签颜色',
      name: 'axis3LabelColor',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '轴文字颜色',
      name: 'axis3TextColor',
      required: false
    },
    {
			componentName: 'Input',
			label: 'X轴名称',
			name: 'x3Name',
			required: false
		},
    {
			componentName: 'Input',
			label: 'Y轴名称',
			name: 'y3Name',
			required: false
		},
    {
			componentName: 'Input',
			label: 'Z轴名称',
			name: 'z3Name',
			required: false
		},
    {
			componentName: 'InputNumber',
			label: '最大映射值',
			name: 'g3Max',
			required: false
		},
    [
      {
        name: '标题',
        list: echarts.title
      },
      ...animate.configure
    ]
  ],
  data: data.configure
}

export default polarbar
