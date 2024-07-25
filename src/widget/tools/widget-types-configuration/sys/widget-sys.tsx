const sys = {
  // 基础配置项
  configure: [
    {
      componentName: 'Select',
      label: '组件类型',
      name: 'componentType',
      placeholder: '',
      options: [
        { code: 'comp1', name: '类型一' },
        { code: 'comp2', name: '类型二' }
      ]
    },
    {
      componentName: 'InputNumber',
      label: '字体大小',
      name: 'styleFontSize',
      required: false,
      min: 12,
      placeholder: ''
    },
    {
      componentName: 'SketchPicker',
      label: '字体颜色',
      name: 'styleColor',
      required: false,
      placeholder: '请选择字体颜色'
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
      componentName: 'InputNumber',
      label: '字体间距',
      name: 'styleLetterSpacing',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'InputNumber',
      label: '高亮左边距',
      name: 'leftDistance',
      required: false,
      placeholder: '',
      relationFields: 'componentType',
      relationValues: 'comp2'
    },
    {
      componentName: 'InputNumber',
      label: '高亮底边距',
      name: 'bottomDistance',
      required: false,
      placeholder: '',
      relationFields: 'componentType',
      relationValues: 'comp2'
    },
    {
      componentName: 'Input',
      label: '探放水视频',
      name: 'videoSrc',
      required: false,
      placeholder: '',
      tooltip: '跳转目的站点的完整地址，带协议名'
    }
  ]
}

export default sys
