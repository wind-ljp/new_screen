/*
 * 所有组件默认配置的集合
 * @Author:  liaojp
 * @Date: 2022-08-10 10:21:13
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-17 11:09:30
 */
import text from './text/main'
import widgetGroup from './widget-group'
import image from './image/main'
import line from './line/main'
import bar from './bar/main'
import pie from './pie/main'
import radar from './radar/main'
import funnel from './funnel/main'
import scatter from './scatter/main'
import tablenew from './tablenew/main'
import form from './form/main'
import emap from './emap/main'
import wrodcloud from './wordcloud/main'
import sys from './sys/main'
import polarbar from './polarbar/main'
import polarline from './polarline/main'
import border from './border/main'
import other from './other/main'
import guage from './guage/main'
import decoration from './decoration/main'

const widgetConfiguration: any = {
  widgetGroup,
  ...image,
  ...text,
  ...line,
  ...bar,
  ...pie,
  ...radar,
  ...funnel,
  ...scatter,
  ...form,
  ...emap,
  ...wrodcloud,
  ...tablenew,
  ...sys,
  ...polarbar,
  ...polarline,
  ...border,
  ...other,
  ...guage,
  ...decoration
}

export default widgetConfiguration
