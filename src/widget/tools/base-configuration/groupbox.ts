/*
 * 组组件盒子配置
 * @Author:  liaojp
 * @Date: 2022-08-10 10:16:14
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 14:14:23
 */
const box = {
  configureValue: {
    styleBoxInset: false,
    styleBoxShadowX: 0,
    styleBoxShadowY: 0,
    styleBoxShadowF: 0,
    styleBoxShadowC: '',
    styleBorderStyle: 'none',
    styleBorderWidth: 0,
    styleBorderColor: '',
    styleBorderTopLeftRadius: 0,
    styleBorderTopRightRadius: 0,
    styleBorderBottomLeftRadius: 0,
    styleBorderBottomRightRadius: 0,
    groupBorderType: 18,
    isScreenHead: false
  },
  configure: [
    {
      name: '边框',
      list: [
        {
          componentName: 'Select',
          label: '边框样式',
          name: 'groupBorderType',
          required: false,
          placeholder: '请选择边框样式',
          options: [
            { code: 18, name: '无' },
            { code: 17, name: '模板一' },
            { code: 1, name: '边框1' },
            { code: 2, name: '边框2' },
            { code: 3, name: '边框3' },
            { code: 4, name: '边框4' },
            { code: 5, name: '边框4(reverse)' },
            { code: 6, name: '边框5' },
            { code: 7, name: '边框5(reverse)' },
            { code: 8, name: '边框6' },
            { code: 9, name: '边框7' },
            { code: 10, name: '边框8' },
            { code: 11, name: '边框8(reverse)' },
            { code: 12, name: '边框9' },
            { code: 13, name: '边框10' },
            { code: 14, name: '边框11' },
            { code: 15, name: '边框12' },
            { code: 16, name: '边框13' }
          ]
        }
      ]
    },
    {
      name: '组显示状态控制',
      list: [
        {
          componentName: 'Switch',
          label: '是否控制',
          name: 'showWidgetStatus',
          required: false,
          placeholder: '请选择',
          tooltip: '组合隐藏及显示效果只在预览页生效'
        },
        {
          componentName: 'Input',
          label: '图标地址',
          name: 'showIconAddress',
          required: false,
          placeholder: '请输入地址',
          tooltip: '若未输入将采用默认图标',
          relationFields: 'showWidgetStatus',
          relationValues: 'true'
        },
        {
          componentName: 'InputNumber',
          label: '图标高度',
          name: 'iconHeight',
          required: false,
          placeholder: '请输入图标高度',
          relationFields: 'showWidgetStatus',
          relationValues: 'true'
        },
        {
          componentName: 'InputNumber',
          label: '图标宽度',
          name: 'iconWidth',
          required: false,
          placeholder: '请输入图标宽度',
          relationFields: 'showWidgetStatus',
          relationValues: 'true'
        },
        {
          componentName: 'Select',
          label: '隐藏方向',
          name: 'showIconPosition',
          required: false,
          placeholder: '请选择隐藏方向',
          relationFields: 'showWidgetStatus',
          relationValues: 'true',
          options: [
            { code: 'top', name: '上' },
            { code: 'bottom', name: '下' },
            { code: 'left', name: '左' },
            { code: 'right', name: '右' }
          ]
        }
      ]
    },
    {
      name: '是否大屏头部控件',
      list: [
        {
          componentName: 'Switch',
          label: '是否头部',
          name: 'isScreenHead',
          required: false,
          placeholder: '请选择',
          tooltip: '如果是大屏头部组件，请务必打开此选项，非头部组件请勿打开此开关！！！'
        }
      ]
    }
  ]
}

export default box
