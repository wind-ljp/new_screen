import baseConfiguration from '../../base-configuration';
const { animate } = baseConfiguration;

const decoration = {
  configure: [
    {
      componentName: 'SketchPicker',
      label: '主颜色',
      name: 'firstDecorationColor',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '副颜色',
      name: 'secondDecorationColor',
      required: false
    },
    [
      ...animate.configure
    ]
  ]
}

export default decoration