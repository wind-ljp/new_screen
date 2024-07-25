/*
 * 图表配置
 * @Author:  liaojp
 * @Date: 2022-08-10 10:16:02
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 17:26:08
 */
const echarts = {
  // 标题配置项值
  titleValue: {
    titleTextShow: false,
    titleText: '',
    titleTextFontSize: 14,
    titleTextLineHeight: 1.2,
    titleTextFontFamily: 'SimSun',
    titleTextFontWeight: 'bold',
    titleTextColor: '#fff'
  },
  // 标题配置项
  title: [
    {
      componentName: 'Switch',
      label: '是否显示',
      name: 'titleTextShow',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Input',
      label: '主标题',
      name: 'titleText',
      required: false,
      placeholder: '请输入主标题',
      relationFields: 'titleTextShow',
      relationValues: 'true'
    },
    {
      componentName: 'InputNumber',
      label: '字体大小',
      name: 'titleTextFontSize',
      required: false,
      min: 12,
      placeholder: '',
      relationFields: 'titleTextShow',
      relationValues: 'true'
    },
    {
      componentName: 'InputNumber',
      label: '行高',
      name: 'titleTextLineHeight',
      required: false,
      placeholder: '',
      relationFields: 'titleTextShow',
      relationValues: 'true'
    },
    {
      componentName: 'Select',
      label: '字体样式',
      name: 'titleTextFontFamily',
      required: false,
      placeholder: '',
      relationFields: 'titleTextShow',
      relationValues: 'true',
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
      name: 'titleTextFontWeight',
      required: false,
      placeholder: '',
      relationFields: 'titleTextShow',
      relationValues: 'true',
      options: [
        { code: 'normal', name: '正常' },
        { code: 'bold', name: '粗体' },
        { code: 'bolder', name: '特粗体' },
        { code: 'lighter', name: '细体' }
      ]
    },
    {
      componentName: 'SketchPicker',
      label: '字体颜色',
      name: 'titleTextColor',
      required: false,
      relationFields: 'titleTextShow',
      relationValues: 'true',
      placeholder: '请选择字体颜色'
    }
  ],
  // 图例配置项值
  legendValue: {
    legendShow: true,
    legendType: 'plain',
    legendOrient: 'horizontal',
    legendFontSize: 12,
    legendIcon: 'rect',
    legendColor: '#fff',
    legendLeft: 'center',
    legendTop: 'top'
  },
  // 图例配置项
  legend: [
    {
      componentName: 'Switch',
      label: '是否显示',
      name: 'legendShow',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'SketchPicker',
      label: '字体颜色',
      name: 'legendColor',
      required: false,
      relationFields: 'legendShow',
      relationValues: 'true',
      placeholder: '请选择字体颜色'
    },
    {
      componentName: 'InputNumber',
      label: '字体大小',
      name: 'legendFontSize',
      required: false,
      min: 12,
      placeholder: '',
      relationFields: 'legendShow',
      relationValues: 'true'
    },
    {
      componentName: 'Select',
      label: '图例类型',
      name: 'legendType',
      required: false,
      placeholder: '',
      relationFields: 'legendShow',
      relationValues: 'true',
      options: [
        { code: 'plain', name: '普通图例' },
        { code: 'scroll', name: '可滚动翻页的图例' }
      ]
    },
    {
      componentName: 'Select',
      label: '排列方式',
      name: 'legendOrient',
      required: false,
      placeholder: '',
      relationFields: 'legendShow',
      relationValues: 'true',
      options: [
        { code: 'horizontal', name: '水平' },
        { code: 'vertical', name: '垂直' }
      ]
    },
    {
      componentName: 'Select',
      label: '图标样式',
      name: 'legendIcon',
      required: false,
      placeholder: '',
      relationFields: 'legendShow',
      relationValues: 'true',
      options: [
        { code: 'circle', name: '圆形' },
        { code: 'rect', name: '矩形' },
        { code: 'roundRect', name: '圆角矩形' },
        { code: 'triangle', name: '三角形' },
        { code: 'diamond', name: '菱形' },
        { code: 'arrow', name: '箭头形' },
        { code: 'none', name: '无' }
      ]
    },
    {
      componentName: 'Select',
      label: '水平位置',
      name: 'legendLeft',
      required: false,
      placeholder: '',
      relationFields: 'legendShow',
      relationValues: 'true',
      options: [
        { code: 'left', name: '居左' },
        { code: 'center', name: '居中' },
        { code: 'right', name: '居右' }
      ]
    },
    {
      componentName: 'Select',
      label: '垂直位置',
      name: 'legendTop',
      required: false,
      placeholder: '',
      relationFields: 'legendShow',
      relationValues: 'true',
      options: [
        { code: 'top', name: '居上' },
        { code: 'middle', name: '居中' },
        { code: 'bottom', name: '居下' }
      ]
    }
  ],
  // 风格配置项值
  gridValue: {
    gridShow: false,
    gridLeft: 50,
    gridRight: 30,
    gridTop: 30,
    gridBottom: 30,
    gridBorderColor: '#ccc'
  },
  // 网格配置
  grid: [
    {
      componentName: 'Switch',
      label: '是否显示',
      name: 'gridShow',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '左边距',
      name: 'gridLeft',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '右边距',
      name: 'gridRight',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '上边距',
      name: 'gridTop',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '下边距',
      name: 'gridBottom',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'SketchPicker',
      label: '边框颜色',
      name: 'gridBorderColor',
      required: false,
      relationFields: 'gridShow',
      relationValues: 'true',
      placeholder: '请选择边框颜色'
    }
  ],
  // xAxis配置项值
  xAxisValue: {
    xAxisShow: true,
    xAxisType: 'category',
    xAxisName: '',
    xAxisNameLocation: 'end',
    xAxisNameTextStyleFontSize: 12,
    xAxisNameTextStyleLineHeight: 12,
    xAxisNameTextStyleFontFamily: 'serif',
    xAxisNameTextStyleFontWeight: 'normal',
    xAxisBoundaryGap: false,
    xAxisScale: false,
    xAxisNameRotate: 0,
    xAxisLineShow: true,
    xAxisLabelShow: true,
    xAxisLabelRotate: 0,
    xAxisSplitLineShow: true,
    xAxisSplitAreaShow: false,
    xAxisSplitAreaOpacity: 10,
    xAxisPointerShow: true,
    xAxisTickShow: true,
    xAxisAlignWithLabel: false,
    xAxisScroll: false,
    xAxisScrollLocation: 0,
    xAxisScrollHeight: 30
  },
  // xAsix配置
  xAxis: [
    {
      componentName: 'Switch',
      label: '是否显示',
      name: 'xAxisShow',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Select',
      label: '坐标轴类型',
      name: 'xAxisType',
      required: false,
      placeholder: '请选择',
      relationFields: 'xAxisShow',
      relationValues: 'true',
      options: [
        { code: 'value', name: '数值轴' },
        { code: 'category', name: '类目轴' },
        { code: 'time', name: '时间轴' },
        { code: 'log', name: '对数轴' }
      ]
    },
    {
      componentName: 'Switch',
      label: '是否留白',
      name: 'xAxisBoundaryGap',
      required: false,
      relationFields: 'xAxisShow',
      relationValues: 'true',
      placeholder: '请输入'
    },
    {
      componentName: 'Switch',
      label: '脱离0值',
      name: 'xAxisScale',
      required: false,
      relationFields: 'xAxisShow',
      relationValues: 'true',
      placeholder: '请输入',
      tooltip: '是否是脱离 0 值比例。开启后坐标刻度不会强制包含零刻度，仅数值轴生效。'
    },
    [
      {
        name: '坐标轴名称',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Input',
            label: '名称',
            name: 'xAxisName',
            required: false,
            placeholder: '请输入'
          },
          {
            componentName: 'Slider',
            label: '旋转',
            name: 'xAxisNameRotate',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Select',
            label: '显示位置',
            name: 'xAxisNameLocation',
            required: false,
            placeholder: '请选择',
            options: [
              { code: 'start', name: '局左' },
              { code: 'middle', name: '居中' },
              { code: 'end', name: '居右' }
            ]
          },
          {
            componentName: 'InputNumber',
            label: '字体大小',
            name: 'xAxisNameTextStyleFontSize',
            required: false,
            min: 12,
            placeholder: ''
          },
          {
            componentName: 'InputNumber',
            label: '行高',
            name: 'xAxisNameTextStyleLineHeight',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Select',
            label: '字体样式',
            name: 'xAxisNameTextStyleFontFamily',
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
            name: 'xAxisNameTextStyleFontWeight',
            required: false,
            placeholder: '',
            options: [
              { code: 'normal', name: '正常' },
              { code: 'bold', name: '粗体' },
              { code: 'bolder', name: '特粗体' },
              { code: 'lighter', name: '细体' }
            ]
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴轴线',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'xAxisLineShow',
            required: false,
            placeholder: '请输入'
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴刻度',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'xAxisTickShow',
            required: false,
            placeholder: '请输入'
          },
          {
            componentName: 'Switch',
            label: '对齐标签',
            name: 'xAxisAlignWithLabel',
            required: false,
            relationFields: 'xAxisTickShow',
            relationValues: 'true',
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴刻度标签',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'xAxisLabelShow',
            required: false,
            placeholder: '请输入'
          },
          {
            componentName: 'Slider',
            label: '旋转',
            name: 'xAxisLabelRotate',
            required: false,
            relationFields: 'xAxisLabelShow',
            relationValues: 'true',
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴分隔线',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'xAxisSplitLineShow',
            required: false,
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴分隔区域',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'xAxisSplitAreaShow',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Slider',
            label: '透明度',
            name: 'xAxisSplitAreaOpacity',
            required: false,
            relationFields: 'xAxisSplitAreaShow',
            relationValues: 'true'
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴指示器',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'xAxisPointerShow',
            required: false,
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴区域缩放',
        relationFields: 'xAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否开启',
            name: 'xAxisScroll',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'InputNumber',
            label: '位置',
            name: 'xAxisScrollLocation',
            required: false,
            relationFields: 'xAxisScroll',
            relationValues: 'true',
            tooltip: "到底部的距离，可设置负数"
          },
          {
            componentName: 'InputNumber',
            label: '高度',
            name: 'xAxisScrollHeight',
            required: false,
            relationFields: 'xAxisScroll',
            relationValues: 'true',
            tooltip: "滚动条的高度"
          }
        ]
      }
    ]
  ],
  // yAxis配置项值
  yAxisValue: {
    yAxisShow: true,
    yAxisType: 'value',
    yAxisName: '',
    yAxisNameLocation: 'end',
    yAxisNameTextStyleFontSize: 12,
    yAxisNameTextStyleLineHeight: 12,
    yAxisNameTextStyleFontFamily: 'serif',
    yAxisNameTextStyleFontWeight: 'normal',
    yAxisBoundaryGap: false,
    yAxisScale: false,
    yAxisNameRotate: 0,
    yAxisLineShow: true,
    yAxisLabelShow: true,
    yAxisLabelRotate: 0,
    yAxisSplitLineShow: true,
    yAxisSplitAreaShow: false,
    yAxisSplitAreaOpacity: 10,
    yAxisPointerShow: false,
    yAxisTickShow: true,
    yAxisAlignWithLabel: false,
    yAxisScroll: false,
    yAxisScrollLocation: 0,
    yAxisScrollWidth: 30
  },
  // yAxis配置项
  yAxis: [
    {
      componentName: 'Switch',
      label: '是否显示',
      name: 'yAxisShow',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Select',
      label: '坐标轴类型',
      name: 'yAxisType',
      required: false,
      placeholder: '请选择',
      relationFields: 'yAxisShow',
      relationValues: 'true',
      options: [
        { code: 'value', name: '数值轴' },
        { code: 'category', name: '类目轴' },
        { code: 'time', name: '时间轴' },
        { code: 'log', name: '对数轴' }
      ]
    },
    {
      componentName: 'Switch',
      label: '是否留白',
      name: 'yAxisBoundaryGap',
      required: false,
      relationFields: 'yAxisShow',
      relationValues: 'true',
      placeholder: '请输入'
    },
    {
      componentName: 'Switch',
      label: '脱离0值',
      name: 'yAxisScale',
      required: false,
      relationFields: 'yAxisShow',
      relationValues: 'true',
      placeholder: '请输入',
      tooltip: '是否是脱离 0 值比例。开启后坐标刻度不会强制包含零刻度，仅数值轴生效。'
    },
    [
      {
        name: '坐标轴名称',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Input',
            label: '名称',
            name: 'yAxisName',
            required: false,
            placeholder: '请输入'
          },
          {
            componentName: 'Slider',
            label: '旋转',
            name: 'yAxisNameRotate',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Select',
            label: '显示位置',
            name: 'yAxisNameLocation',
            required: false,
            placeholder: '请选择',
            options: [
              { code: 'start', name: 'start' },
              { code: 'middle', name: 'middle' },
              { code: 'end', name: 'end' }
            ]
          },
          {
            componentName: 'InputNumber',
            label: '字体大小',
            name: 'yAxisNameTextStyleFontSize',
            required: false,
            min: 12,
            placeholder: ''
          },
          {
            componentName: 'InputNumber',
            label: '行高',
            name: 'yAxisNameTextStyleLineHeight',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Select',
            label: '字体样式',
            name: 'yAxisNameTextStyleFontFamily',
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
            name: 'yAxisNameTextStyleFontWeight',
            required: false,
            placeholder: '',
            options: [
              { code: 'normal', name: '正常' },
              { code: 'bold', name: '粗体' },
              { code: 'bolder', name: '特粗体' },
              { code: 'lighter', name: '细体' }
            ]
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴轴线',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'yAxisLineShow',
            required: false,
            placeholder: '请输入'
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴刻度',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'yAxisTickShow',
            required: false,
            placeholder: '请输入'
          },
          {
            componentName: 'Switch',
            label: '对齐标签',
            name: 'yAxisAlignWithLabel',
            required: false,
            relationFields: 'yAxisTickShow',
            relationValues: 'true',
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴刻度标签',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'yAxisLabelShow',
            required: false,
            placeholder: '请输入'
          },
          {
            componentName: 'Slider',
            label: '旋转',
            name: 'yAxisLabelRotate',
            required: false,
            relationFields: 'yAxisLabelShow',
            relationValues: 'true',
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴分隔线',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'yAxisSplitLineShow',
            required: false,
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴分隔区域',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'yAxisSplitAreaShow',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Slider',
            label: '透明度',
            name: 'yAxisSplitAreaOpacity',
            required: false,
            relationFields: 'yAxisSplitAreaShow',
            relationValues: 'true'
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴指示器',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'yAxisPointerShow',
            required: false,
            placeholder: ''
          }
        ]
      }
    ],
    [
      {
        name: '坐标轴区域缩放',
        relationFields: 'yAxisShow',
        relationValues: 'true',
        list: [
          {
            componentName: 'Switch',
            label: '是否开启',
            name: 'yAxisScroll',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'InputNumber',
            label: '位置',
            name: 'yAxisScrollLocation',
            required: false,
            relationFields: 'yAxisScroll',
            relationValues: 'true',
            tooltip: "到右部的距离，可设置负数"
          },
          {
            componentName: 'InputNumber',
            label: '宽度',
            name: 'yAxisScrollWidth',
            required: false,
            relationFields: 'yAxisScroll',
            relationValues: 'true',
            tooltip: "滚动条的宽度"
          }
        ]
      }
    ]
  ],
  // 颜色值
  echartColorValue: {
    axisNameColor: 'rgba(255,255,255,.2)',
    axisLineColor: 'rgba(255,255,255,.2)',
    axisLabelColor: 'rgba(255,255,255,.8)',
    splitLineColor: 'rgba(255,255,255,.2)',
    axisPointerColor: 'red',
    isLinearColor: false, // 是否渐变
    themeColor1: '#fc97af',
    themeColor2: '#87f7cf',
    themeColor3: '#f7f494',
    themeColor4: '#72ccff',
    themeColor5: '#f7c5a0',
    themeColor6: '#d4a4eb',
    themeColor7: '#d2f5a6',
    themeColor8: '#76f2f2',
    themeLinearColor1: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor2: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor3: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor4: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor5: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor6: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor7: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ],
    themeLinearColor8: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ]
  },
  // 颜色配置
  echartColor: [
    {
      componentName: 'SketchPicker',
      label: '坐标名称颜色',
      name: 'axisNameColor',
      required: false,
      placeholder: '请选择颜色'
    },
    {
      componentName: 'SketchPicker',
      label: '轴线颜色',
      name: 'axisLineColor',
      required: false,
      placeholder: '请选择颜色'
    },
    {
      componentName: 'SketchPicker',
      label: '刻度标签颜色',
      name: 'axisLabelColor',
      required: false,
      placeholder: '请选择颜色'
    },
    {
      componentName: 'SketchPicker',
      label: '分隔线颜色',
      name: 'splitLineColor',
      required: false,
      placeholder: '请选择颜色'
    },
    {
      componentName: 'SketchPicker',
      label: '指示器颜色',
      name: 'axisPointerColor',
      required: false,
      placeholder: '请选择颜色'
    },
    [
      {
        name: '主题色',
        list: [
          {
            componentName: 'Switch',
            label: '是否渐变色',
            name: 'isLinearColor',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'SketchPicker',
            label: '系列一',
            name: 'themeColor1',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列二',
            name: 'themeColor2',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列三',
            name: 'themeColor3',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列四',
            name: 'themeColor4',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列五',
            name: 'themeColor5',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列六',
            name: 'themeColor6',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列七',
            name: 'themeColor7',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'SketchPicker',
            label: '系列八',
            name: 'themeColor8',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'false'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列一',
            name: 'themeLinearColor1',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列二',
            name: 'themeLinearColor2',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列三',
            name: 'themeLinearColor3',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列四',
            name: 'themeLinearColor4',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列五',
            name: 'themeLinearColor5',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列六',
            name: 'themeLinearColor6',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列七',
            name: 'themeLinearColor7',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '系列八',
            name: 'themeLinearColor8',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'isLinearColor',
            relationValues: 'true'
          }
        ]
      }
    ]
  ],
  // 标记配置项值
  symbolValue: {
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 4
  },
  symbol: [
    {
      name: '标记',
      list: [
        {
          componentName: 'Switch',
          label: '显示标记',
          name: 'showSymbol',
          required: false,
          placeholder: ''
        },
        {
          componentName: 'Select',
          label: '标记图标',
          name: 'symbol',
          required: false,
          placeholder: '请选择标记图标',
          relationFields: 'showSymbol',
          relationValues: 'true',
          options: [
            { code: 'circle', name: '圆形' },
            { code: 'rect', name: '矩形' },
            { code: 'roundRect', name: '圆角矩形' },
            { code: 'triangle', name: '三角形' },
            { code: 'diamond', name: '菱形' },
            { code: 'pin', name: '大头针形' },
            { code: 'arrow', name: '箭头形' },
            { code: 'none', name: '无' }
          ]
        },
        {
          componentName: 'Slider',
          label: '标记大小',
          name: 'symbolSize',
          required: false,
          relationFields: 'showSymbol',
          relationValues: 'true',
          placeholder: ''
        }
      ]
    }
  ],
  // 折线配置项值
  lineValue: {
    lineWidth: 2,
    lineSmooth: false,
    lineAreaStyle: false,
    lineAreaStyleOpacity: 70,
    areaIsLinear: false,
    lineAreaColor: '#fc97af',
    lineAreaLinearColor: [
      { offset: '0.00', color: 'rgb(238, 241, 11)' },
      { offset: '1.00', color: 'rgb(126, 32, 207)' }
    ]
  },
  // 折线配置项
  line: [
    {
      componentName: 'Switch',
      label: '平滑曲线',
      name: 'lineSmooth',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '线条宽度',
      name: 'lineWidth',
      required: false,
      placeholder: ''
    },
    [
      {
        name: '区域面积图',
        list: [
          {
            componentName: 'Switch',
            label: '区域面积图',
            name: 'lineAreaStyle',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'Slider',
            label: '透明度',
            name: 'lineAreaStyleOpacity',
            required: false,
            relationFields: 'lineAreaStyle',
            relationValues: 'true',
            placeholder: ''
          },
          {
            componentName: 'Switch',
            label: '是否渐变色',
            name: 'areaIsLinear',
            required: false,
            placeholder: '',
            relationFields: 'lineAreaStyle',
            relationValues: 'true'
          },
          {
            componentName: 'LinearColorPicker',
            label: '颜色',
            name: 'lineAreaLinearColor',
            required: false,
            relationFields: 'areaIsLinear',
            relationValues: 'true'
          },
          {
            componentName: 'SketchPicker',
            label: '颜色',
            name: 'lineAreaColor',
            required: false,
            relationFields: 'areaIsLinear',
            relationValues: 'false'
          }
        ]
      }
    ]
  ],
  // 柱状图配置项值
  barValue: {
    barWidth: 40,
    barShowBackground: false,
    barBorderRadius: 0,
    barBackgroundStyleColor: 'rgba(255,255,255, 0.1)',
    barBackgroundStyleBorderColor: '',
    barBackgroundStyleBorderWidth: 0,
    barBackgroundStyleBorderType: 'solid'
  },
  // 柱状图配置项
  bar: [
    {
      componentName: 'Slider',
      label: '柱状宽度',
      name: 'barWidth',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '圆角大小',
      name: 'barBorderRadius',
      required: false,
      placeholder: ''
    },
    [
      {
        name: '柱条背景',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'barShowBackground',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'SketchPicker',
            label: '背景颜色',
            name: 'barBackgroundStyleColor',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'barShowBackground',
            relationValues: 'true'
          },
          {
            componentName: 'SketchPicker',
            label: '边框颜色',
            name: 'barBackgroundStyleBorderColor',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'barShowBackground',
            relationValues: 'true'
          },
          {
            componentName: 'InputNumber',
            label: '边框大小',
            name: 'barBackgroundStyleBorderWidth',
            required: false,
            // placeholder: '请选择颜色',
            relationFields: 'barShowBackground',
            relationValues: 'true'
          },
          {
            componentName: 'Select',
            label: '描边类型',
            name: 'barBackgroundStyleBorderType',
            required: false,
            placeholder: '请选择标签的位置',
            relationFields: 'barShowBackground',
            relationValues: 'true',
            options: [
              { code: 'solid', name: '实线' },
              { code: 'dashed', name: '虚线' },
              { code: 'dotted', name: '点虚线' }
            ]
          }
        ]
      },
      {
        name: '柱条描边',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'barBorderShow',
            required: false,
            placeholder: ''
          },
          {
            componentName: 'InputNumber',
            label: '柱条圆角半径',
            name: 'barBorderShowRadius',
            required: false,
            relationFields: 'barBorderShow',
            relationValues: 'true'
          },
          {
            componentName: 'InputNumber',
            label: '描边宽度',
            name: 'barBorderShowWidth',
            required: false,
            relationFields: 'barBorderShow',
            relationValues: 'true'
          },
          {
            componentName: 'SketchPicker',
            label: '描边颜色',
            name: 'barBorderShowColor',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'barBorderShow',
            relationValues: 'true'
          },
          {
            componentName: 'Select',
            label: '描边样式',
            name: 'barBorderShowType',
            required: false,
            relationFields: 'barBorderShow',
            relationValues: 'true',
            options: [
              { code: 'solid', name: '实线' },
              { code: 'dashed', name: '虚线' },
              { code: 'dotted', name: '点虚线' }
            ]
          },
          {
            componentName: 'InputNumber',
            label: '阴影大小',
            name: 'barShadowShowBlur',
            required: false,
            relationFields: 'barBorderShow',
            relationValues: 'true'
          },
          {
            componentName: 'SketchPicker',
            label: '阴影颜色',
            name: 'barShadowShowColor',
            required: false,
            placeholder: '请选择颜色',
            relationFields: 'barBorderShow',
            relationValues: 'true'
          }
        ]
      }
    ]
  ],
  // 数据标签配置项值
  seriesLabelValue: {
    seriesLabelShow: false,
    seriesLabelPosition: 'top',
    seriesLabelColor: '#fff'
  },
  // 数据标签配置项
  seriesLabel: [
    {
      name: '图形上的文本标签',
      list: [
        {
          componentName: 'Switch',
          label: '是否显示',
          name: 'seriesLabelShow',
          required: false,
          placeholder: ''
        },
        {
          componentName: 'Select',
          label: '标签的位置',
          name: 'seriesLabelPosition',
          required: false,
          placeholder: '请选择标签的位置',
          relationFields: 'seriesLabelShow',
          relationValues: 'true',
          options: [
            { code: 'top', name: '上方' },
            { code: 'left', name: '左方' },
            { code: 'right', name: '右方' },
            { code: 'bottom', name: '下方' },
            { code: 'inside', name: '内侧' },
            { code: 'insideLeft', name: '内侧左' },
            { code: 'insideRight', name: '内侧右' },
            { code: 'insideTop', name: '内侧上' },
            { code: 'insideBottom', name: '内侧下' },
            { code: 'insideTopLeft', name: '内侧上左' },
            { code: 'insideBottomLeft', name: '内侧下左' },
            { code: 'insideTopRight', name: '内侧顶左' },
            { code: 'insideBottomRight', name: '内侧顶右' }
          ]
        },
        {
          componentName: 'SketchPicker',
          label: '文字颜色',
          name: 'seriesLabelColor',
          required: false,
          relationFields: 'seriesLabelShow',
          relationValues: 'true',
          placeholder: '请选择文字颜色'
        }
      ]
    }
  ],
  // 数据堆叠配置项
  seriesStackValue: {
    seriesStackValue: ''
  },
  seriesStack: [
    {
      componentName: 'Switch',
      label: '数据堆积',
      name: 'seriesStackValue',
      required: false
      // placeholder: '请输入数据堆积名称'
    }
  ],
  // 饼图配置项值
  pieValue: {
    seriesInsideRadius: 0,
    seriesAutsideRadius: 80,
    seriesRoseType: false,
    seriesIsPadAngle: false,
    seriesPadAngle: 5
  },
  // 饼图配置项
  pie: [
    {
      componentName: 'Slider',
      label: '内半径',
      name: 'seriesInsideRadius',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Slider',
      label: '外半径',
      name: 'seriesAutsideRadius',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Switch',
      label: '南丁格尔图',
      name: 'seriesRoseType',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Switch',
      label: '开启间隙',
      name: 'seriesIsPadAngle',
      required: false
    },
    {
      componentName: 'InputNumber',
      label: '间隙宽度',
      name: 'seriesPadAngle',
      required: false,
      relationFields: 'seriesIsPadAngle',
      relationValues: 'true'
    }
  ],
  // 雷达图配置项值
  radarValue: {
    radarShape: 'polygon',
    radarRadius: 75,
    radarAxisLinelColor: 'rgba(255,255,255,.8)',
    radarSplitLineColor: 'rgba(255,255,255,.05)',
    radarSplitAreaOddColor: 'rgba(250,250,250,0.3)',
    radarSplitAreaEvenColor: 'rgba(200,200,200,0.3)'
  },
  // 雷达图配置项
  radar: [
    {
      componentName: 'Select',
      label: '绘制类型',
      name: 'radarShape',
      required: false,
      placeholder: '',
      options: [
        { code: 'polygon', name: '多边形' },
        { code: 'circle', name: '圆形' }
      ]
    },
    {
      componentName: 'Slider',
      label: '半径',
      name: 'radarRadius',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'SketchPicker',
      label: '轴线颜色',
      name: 'radarAxisLinelColor',
      required: false,
      placeholder: '请选择颜色'
    },
    {
      componentName: 'SketchPicker',
      label: '分隔线颜色',
      name: 'radarSplitLineColor',
      required: false,
      placeholder: '请选择颜色'
    },
    [
      {
        name: '分隔区域颜色',
        list: [
          {
            componentName: 'SketchPicker',
            label: '奇数行',
            name: 'radarSplitAreaOddColor',
            required: false,
            placeholder: '请选择颜色'
          },
          {
            componentName: 'SketchPicker',
            label: '偶数行',
            name: 'radarSplitAreaEvenColor',
            required: false,
            placeholder: '请选择颜色'
          }
        ]
      }
    ]
  ],
  // 漏斗图配置项值
  funnelValue: {
    funnelOrient: 'vertical',
    funnelSort: 'descending',
    funnelGap: 0
  },
  // 漏斗图配置
  funnel: [
    {
      componentName: 'Select',
      label: '漏斗图朝向',
      name: 'funnelOrient',
      required: false,
      placeholder: '',
      options: [
        { code: 'vertical', name: '竖向' },
        { code: 'horizontal', name: '横向' }
      ]
    },
    {
      componentName: 'Select',
      label: '数据排序',
      name: 'funnelSort',
      required: false,
      placeholder: '',
      options: [
        { code: 'ascending', name: '升序' },
        { code: 'descending', name: '降序' },
        { code: 'none', name: '无' }
      ]
    },
    {
      componentName: 'Slider',
      label: '图形间距',
      name: 'funnelGap',
      required: false,
      placeholder: ''
    }
  ],
  // 散点图配置项值
  scatterValue: {
    scatterColorBy: 'data'
  },
  scatter: [
    {
      componentName: 'Select',
      label: '取色的策略',
      name: 'scatterColorBy',
      required: false,
      placeholder: '',
      options: [
        { code: 'series', name: '系列项分配' },
        { code: 'data', name: '数据项分配' }
      ]
    }
  ]
}

export default echarts
