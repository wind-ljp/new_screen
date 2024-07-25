/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-13 11:31:30
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-13 11:40:10
 */
import baseConfiguration from '../../base-configuration';
const { font, animate, data, box } = baseConfiguration;

const widgetNoticeText = {
	// 基础配置项
	configure: [
		{
      componentName: 'InputNumber',
      label: '字体大小',
      name: 'styleFontSize',
      required: false,
      min: 12,
      placeholder: ''
    },
    {
      componentName: 'InputNumber',
      label: '字体间距',
      name: 'styleLetterSpacing',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'InputNumber',
      label: '行高',
      name: 'styleLineHeight',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Select',
      label: '字体样式',
      name: 'styleFontFamily',
      required: false,
      placeholder: '',
      options: [
        { code: 'SimSun', name: '宋体' },
        { code: 'KaiTi', name: '楷体' },
        // { code: 'Microsoft YaHei', name: '微软雅黑' },
        { code: 'STHeiti', name: '华文黑体' },
        { code: 'arial', name: '无衬线体' },
        { code: 'serif', name: '有衬线体' },
        { code: 'cursive', name: '草书' },
        { code: 'monospace', name: '等宽字体' },
        { code: 'courier', name: '打印字体' },
        { code: 'YouSheBiaoTiHei', name: '优设标题黑' },
        { code: 'AlibabaSans', name: '阿里巴巴普惠字体' },
        { code: 'SourceHanSansCN', name: '思源黑' },
        { code: 'SourceHanSerifCN', name: '思源宋' }
      ]
    },
    {
      componentName: 'Select',
      label: '文字粗细',
      name: 'styleFontWeight',
      required: false,
      placeholder: '',
      options: [
        { code: 'normal', name: '正常' },
        { code: 'bold', name: '粗体' },
        { code: 'bolder', name: '特粗体' },
        { code: 'lighter', name: '细体' }
      ]
    },
    {
      componentName: 'Select',
      label: '对齐方式',
      name: 'styleTextAlign',
      required: false,
      placeholder: '',
      options: [
        { code: 'center', name: '居中' },
        { code: 'left', name: '左对齐' },
        { code: 'right', name: '右对齐' }
      ]
    },
    {
      componentName: 'SketchPicker',
      label: '字体颜色',
      name: 'styleColor',
      required: false,
      placeholder: '请选择字体颜色'
    },
    {
      componentName: 'SketchPicker',
      label: '背景颜色',
      name: 'styleBackgroundColor',
      required: false,
      placeholder: '请选择背景颜色'
    },
    {
      componentName: 'InputNumber',
      label: '切换延时(ms)',
      name: 'noticeDelay',
      required: false,
      placeholder: ''
    },
		[
			...animate.configure,
			{
				name: '文字阴影',
				list: [
					{
						componentName: 'InputNumber',
						label: 'X轴偏移',
						name: 'styleTextShadowX',
						required: false,
						placeholder: '请输入X轴偏移'
					},
					{
						componentName: 'InputNumber',
						label: 'Y轴偏移',
						name: 'styleTextShadowY',
						required: false,
						placeholder: '请输入Y轴偏移'
					},
					{
						componentName: 'InputNumber',
						label: '模糊值',
						name: 'styleTextShadowF',
						required: false,
						placeholder: '请输入模糊值'
					},
					{
						componentName: 'SketchPicker',
						label: '颜色',
						name: 'styleTextShadowC',
						required: false,
						placeholder: '请选择颜色'
					}
				]
			},
			...box.configure
		]
	],
	data: data.configure
};

export default widgetNoticeText;