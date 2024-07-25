/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-05-29 13:51:51
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-05-29 14:31:00
 */
import baseConfiguration from '../../base-configuration';
const { animate, data } = baseConfiguration;

const guagePercent = {
  configure: [
    [
      ...animate.configure
    ],
    {
			componentName: 'Input',
			label: '后缀',
			name: 'percenLabel',
			required: false,
			tooltip: '数字后面携带的符号'
		},
    {
      componentName: 'SketchPicker',
      label: '值颜色',
      name: 'labelColor',
      required: false
    },
    {
			componentName: 'InputNumber',
			label: '字号',
			name: 'labelFontSize',
			required: false
		},
    {
			componentName: 'InputNumber',
			label: '环形宽度',
			name: 'arcLineWidth',
			required: false
		},
    {
      componentName: 'SketchPicker',
      label: '环形颜色1',
      name: 'gradient1',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '环形颜色2',
      name: 'gradient2',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '环形颜色3',
      name: 'gradient3',
      required: false
    }
  ],
  data: data.configure
};

export default guagePercent