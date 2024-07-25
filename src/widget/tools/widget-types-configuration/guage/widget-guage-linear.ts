/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-05 15:08:46
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-05 15:36:33
 */
import baseConfiguration from '../../base-configuration';
const { animate, data } = baseConfiguration;

const guageLinear = {
  configure: [
    [
      {
        name: '基础配置',
        list: [
          {
            componentName: 'Select',
            label: '端点形状',
            name: 'dataItemStyle_lineCap',
            required: false,
            options: [
              { code: 'butt', name: '默认' },
              { code: 'round', name: '半圆' },
              { code: 'square', name: '方形' }
            ]
          },
          {
            componentName: 'Input',
            label: '中心点X',
            name: 'dataItemStyle_centerX',
            required: false
          },
          {
            componentName: 'Input',
            label: '中心点Y',
            name: 'dataItemStyle_centerY',
            required: false
          },
          {
            componentName: 'Input',
            label: '半径',
            name: 'dataItemStyle_radius',
            required: false
          },
          {
            componentName: 'Input',
            label: '起始角度',
            name: 'dataItemStyle_startAngle',
            required: false
          },
          {
            componentName: 'Input',
            label: '结束角度',
            name: 'dataItemStyle_endAngle',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '分隔数目',
            name: 'dataItemStyle_splitNum',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '弧线宽度',
            name: 'dataItemStyle_arcLineWidth',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '最小值',
            name: 'dataItemStyle_min',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '最大值',
            name: 'dataItemStyle_max',
            required: false
          }
        ]
      },
      {
        name: '坐标刻度配置',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'axisTick_show',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '长度',
            name: 'axisTick_tickLength',
            required: false
          },
          {
            componentName: 'SketchPicker',
            label: '颜色',
            name: 'axisTick_stroke',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '线宽',
            name: 'axisTick_lineWidth',
            required: false
          }
        ]
      },
      {
        name: '坐标标签配置',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'axisLabel_show',
            required: false
          },
          {
            componentName: 'Input',
            label: '后缀',
            name: 'axisLabel_formatter',
            required: false
          },
          {
            componentName: 'SketchPicker',
            label: '颜色',
            name: 'axisLabel_fill',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '字号',
            name: 'axisLabel_fontSize',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '间隔',
            name: 'axisLabel_labelGap',
            required: false,
            tooltip: '坐标标签与刻度线间的间隔'
          }
        ]
      },
      {
        name: '指针配置',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'pointer_show',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '索引',
            name: 'pointer_valueIndex',
            required: false,
            tooltip: '指针从数据中获取值的索引'
          },
          {
            componentName: 'InputNumber',
            label: '宽度',
            name: 'pointer_scaleX',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '高度',
            name: 'pointer_scaleY',
            required: false
          },
          {
            componentName: 'SketchPicker',
            label: '颜色',
            name: 'pointer_fill',
            required: false
          }
        ]
      },
      {
        name: '圆弧详情配置',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'details_show',
            required: false
          },
          {
            componentName: 'Input',
            label: '前缀',
            name: 'details_formatter_front',
            required: false
          },
          {
            componentName: 'Input',
            label: '后缀',
            name: 'details_formatter',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '位置X',
            name: 'details_offsetX',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '位置Y',
            name: 'details_offsetY',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '数值小数精度',
            name: 'details_valueToFixed',
            required: false
          },
          {
            componentName: 'SketchPicker',
            label: '颜色',
            name: 'details_fill',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '字号',
            name: 'details_fontSize',
            required: false
          }
        ]
      },
      {
        name: '圆弧背景配置',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'backgroundArc_show',
            required: false
          },
          {
            componentName: 'SketchPicker',
            label: '颜色',
            name: 'backgroundArc_stroke',
            required: false
          },
          {
            componentName: 'InputNumber',
            label: '线宽',
            name: 'backgroundArc_lineWidth',
            required: false
          },
          {
            componentName: 'Select',
            label: '端点形状',
            name: 'backgroundArc_lineCap',
            required: false,
            options: [
              { code: 'butt', name: '默认' },
              { code: 'round', name: '半圆' },
              { code: 'square', name: '方形' }
            ]
          }
        ]
      }
    ],
    [
      ...animate.configure
    ],
    {
      componentName: 'SketchPicker',
      label: '渐变颜色1',
      name: 'linearColor1',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '渐变颜色2',
      name: 'linearColor2',
      required: false
    },
    {
      componentName: 'SketchPicker',
      label: '渐变颜色3',
      name: 'linearColor3',
      required: false
    }
  ],
  data: data.configure
};

export default guageLinear