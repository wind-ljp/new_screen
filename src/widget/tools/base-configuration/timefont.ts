/*
 * 字体配置
 * @Author:  liaojp
 * @Date: 2022-08-10 10:16:14
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-17 11:37:07
 */
const font = {
  configureValue: {
    styleFontSize: 26,
    styleLetterSpacing: 0,
    styleFontWeight: 'normal',
    styleTextAlign: 'center',
    styleBackgroundColor: '',
    styleFontFamily: 'SimSun',
    styleLineHeight: 1,
    styleColor: '#fff'
  },
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
    }
    // {
    //   componentName: 'Input',
    //   label: '跳转地址',
    //   name: 'locationAddress',
    //   required: false,
    //   placeholder: 'https://www.baidu.com/'
    // }
  ]
}

export default font
