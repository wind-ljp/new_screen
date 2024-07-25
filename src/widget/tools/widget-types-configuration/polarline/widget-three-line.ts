/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-10-13 13:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-13 14:12:11
 */
import baseConfiguration from '../../base-configuration'
const { echarts, animate, data } = baseConfiguration

const threeline = {
  configure: [
    {
      componentName: 'Switch',
      label: '是否显示轴',
      name: 'axis2StatusLine',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '轴标签颜色',
      name: 'axis3LabelColorLine',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '轴文字颜色',
      name: 'axis3TextColorLine',
      required: false
    },
    {
      componentName: 'Input',
      label: 'X轴名称',
      name: 'x3NameLine',
      required: false
    },
    {
      componentName: 'Input',
      label: 'Y轴名称',
      name: 'y3NameLine',
      required: false
    },
    {
      componentName: 'Input',
      label: 'Z轴名称',
      name: 'z3NameLine',
      required: false
    },
    {
      componentName: 'InputNumber',
      label: '最大映射值',
      name: 'g3MaxLine',
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

export default threeline
