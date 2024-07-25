/*
 * @Author:  liaojp
 * @Date: 2022-08-10 10:01:56
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-17 11:11:09
 */
import group from './group'
import text from './text/main'
import image from './image/main'
import line from './line'
import bar from './bar'
import pie from './pie'
import radar from './radar'
import funnel from './funnel'
import scatter from './scatter'
import tablenew from './tablenew/main'
import form from './form/main'
import emap from './emap/main'
import wordcloud from './wordcloud'
import sys from './sys/main'
import polarbar from './polarbar/main'
import polarline from './polarline/main'
import border from './border/main'
import linebar from './other/main'
import guage from './guage/main'
import decoration from './decoration/main'

const widgetTypesConfiguration: any = {
  group,
  ...image,
  line,
  bar,
  pie,
  radar,
  funnel,
  scatter,
  wordcloud,
  ...tablenew,
  ...form,
  ...emap,
  ...text,
  ...sys,
  ...polarbar,
  ...polarline,
  ...border,
  ...linebar,
  ...guage,
  ...decoration
}

export default widgetTypesConfiguration
