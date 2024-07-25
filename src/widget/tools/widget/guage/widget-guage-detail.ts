/*
 * @Description: 详情仪表
 * @Author: liaojingping
 * @Date: 2024-06-05 14:43:50
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-05 15:20:12
 */
import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'widgetDetailGuage',
  label: '详情仪表',
  ...config,
  configureValue: {
    ...config.configureValue,
    dataItemStyle_color: '#03c2fd',
    dataItemStyle_min: 0,
    dataItemStyle_max: 100,
    dataItemStyle_lineCap: 'butt',
    dataItemStyle_centerX: '50%',
    dataItemStyle_centerY: '50%',
    dataItemStyle_radius: '60%',
    dataItemStyle_startAngle: -(Math.PI / 4) * 5,
    dataItemStyle_endAngle: Math.PI / 4,
    dataItemStyle_splitNum: 5,
    dataItemStyle_arcLineWidth: 15,
    axisTick_show: true,
    axisTick_tickLength: 6,
    axisTick_stroke: '#ffffff',
    axisTick_lineWidth: 1,
    axisLabel_show: true,
    axisLabel_formatter: '%',
    axisLabel_fill: '#ffffff',
    axisLabel_fontSize: 12,
    axisLabel_labelGap: 5,
    pointer_show: true,
    pointer_valueIndex: 0,
    pointer_scaleX: 1,
    pointer_scaleY: 1,
    pointer_fill: '#fb7293',
    details_show: true,
    details_formatter: '%',
    details_formatter_front: '剩余',
    details_offsetX: 0,
    details_offsetY: 30,
    details_valueToFixed: 0,
    details_fill: '#ffffff',
    details_fontSize: 25,
    backgroundArc_show: true,
    backgroundArc_stroke: '#ffffff',
    backgroundArc_lineWidth: 15,
    backgroundArc_lineCap: 'butt'
  },
  dataValue: {
    ...config.dataValue,
    mock: {
      data: 55
    }
  }
};