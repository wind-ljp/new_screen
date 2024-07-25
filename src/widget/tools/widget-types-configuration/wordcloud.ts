/*
 * @Description: 词云
 * @Author: liaojp
 * @Date: 2022-09-29 17:28:53
 * @LastEditors: liaojp
 * @LastEditTime: 2022-09-29 19:56:59
 * @FilePath: \bigscreen\src\widget\tools\widget-types-configuration\wordcloud.ts
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import baseConfiguration from '../base-configuration'
const { data } = baseConfiguration

const wordcloud = {
  configure: [
    {
      componentName: 'Select',
      label: '字体样式',
      name: 'wordcloudFontFamily',
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
      name: 'wordcloudFontWeight',
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
      label: '间距',
      name: 'wordcloudGridSize',
      required: false,
      placeholder: '请输入间距',
      min: 0,
      max: 100
    },
    {
      componentName: 'InputNumber',
      label: '最大字体',
      name: 'wordcloudMaxFontSize',
      required: false,
      placeholder: '请输入最大字体',
      min: 12,
      max: 100
    }
  ],
  data: data.configure
}

export default wordcloud
