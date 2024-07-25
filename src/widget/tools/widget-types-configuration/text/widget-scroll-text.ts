import baseConfiguration from '../../base-configuration';
const { data } = baseConfiguration;

const widgetScrollText = {
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
      label: '行高',
      name: 'styleLineHeight',
      required: false,
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
      label: '步长',
      name: 'step',
      required: false,
      min: 0,
      max: 100,
      tooltip: '值越大滚动速度越快，为0时不滚动，可设小数'
    },
    {
      componentName: 'Select',
      label: '滚动方向',
      name: 'direction',
      required: false,
      placeholder: '',
      options: [
        // { code: 2, name: '横向' },
        { code: 1, name: '纵向' }
      ]
    },
    {
      componentName: 'Switch',
      label: '鼠标悬停',
      name: 'hoverStop'
    }
	],
	data: data.configure
};

export default widgetScrollText;