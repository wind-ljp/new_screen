import './index.scss'
import text from './text'
import form from './form'
import newtable from './tablenew'
import polarbar from './polarbar'
import polarline from './polarline'
import border from './border'
import other from './other'
import guage from './guage'
import decoration from './decoration'
import image from './image'

// 组件分类
export const componentsClassify: any[] = [
  {
    type: 'decoration',
    icon: '&#xeb73;',
    name: '装饰',
    permission: 'decoration',
    datas: [
      {
        src: require('../assets/image/configuration/decoration/d1.png'),
        widgetName: 'Decoration1',
        name: '装饰一',
        permission: 'decoration1'
      },
      {
        src: require('../assets/image/configuration/decoration/d2.png'),
        widgetName: 'Decoration2',
        name: '装饰二',
        permission: 'decoration2'
      },
      {
        src: require('../assets/image/configuration/decoration/d2r.png'),
        widgetName: 'Decoration2r',
        name: '装饰二-颠倒',
        permission: 'decoration2r'
      },
      {
        src: require('../assets/image/configuration/decoration/d3.png'),
        widgetName: 'Decoration3',
        name: '装饰三',
        permission: 'decoration3'
      },
      {
        src: require('../assets/image/configuration/decoration/d4.png'),
        widgetName: 'Decoration4',
        name: '装饰四',
        permission: 'decoration4'
      },
      {
        src: require('../assets/image/configuration/decoration/d4r.png'),
        widgetName: 'Decoration4r',
        name: '装饰四-颠倒',
        permission: 'decoration4r'
      },
      {
        src: require('../assets/image/configuration/decoration/d5.png'),
        widgetName: 'Decoration5',
        name: '装饰五',
        permission: 'decoration5'
      },
      {
        src: require('../assets/image/configuration/decoration/d6.png'),
        widgetName: 'Decoration6',
        name: '装饰六',
        permission: 'decoration6'
      },
      {
        src: require('../assets/image/configuration/decoration/d8.png'),
        widgetName: 'Decoration8',
        name: '装饰八',
        permission: 'decoration8'
      },
      {
        src: require('../assets/image/configuration/decoration/d8r.png'),
        widgetName: 'Decoration8r',
        name: '装饰八-颠倒',
        permission: 'decoration8r'
      },
      {
        src: require('../assets/image/configuration/decoration/d9.png'),
        widgetName: 'Decoration9',
        name: '装饰九',
        permission: 'decoration9'
      },
      {
        src: require('../assets/image/configuration/decoration/d10.png'),
        widgetName: 'Decoration10',
        name: '装饰十',
        permission: 'decoration10'
      },
      {
        src: require('../assets/image/configuration/decoration/d11.png'),
        widgetName: 'Decoration11',
        name: '装饰十一',
        permission: 'decoration11'
      }
    ]
  },
  {
    type: 'border',
    icon: '&#xeb70;',
    name: '边框',
    permission: 'border',
    datas: [
      {
        src: require('../assets/image/configuration/border/BorderBox1.png'),
        widgetName: 'widgetPublicBorder',
        name: '自定义SVG边框',
        permission: 'borderPublic'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox1.png'),
        widgetName: 'borderBox1',
        name: '边框一',
        permission: 'border1'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox2.png'),
        widgetName: 'borderBox2',
        name: '边框二',
        permission: 'border2'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox3.png'),
        widgetName: 'borderBox3',
        name: '边框三',
        permission: 'border3'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox4.png'),
        widgetName: 'borderBox4',
        name: '边框四',
        permission: 'border4'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox4-R.png'),
        widgetName: 'borderBox4R',
        name: '边框四-颠倒',
        permission: 'border4R'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox5.png'),
        widgetName: 'borderBox5',
        name: '边框五',
        permission: 'border5'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox5-R.png'),
        widgetName: 'borderBox5R',
        name: '边框五-颠倒',
        permission: 'border5R'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox6.png'),
        widgetName: 'borderBox6',
        name: '边框六',
        permission: 'border6'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox7.png'),
        widgetName: 'borderBox7',
        name: '边框七',
        permission: 'border7'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox8.png'),
        widgetName: 'borderBox8',
        name: '边框八',
        permission: 'border8'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox8-R.png'),
        widgetName: 'borderBox8R',
        name: '边框八-颠倒',
        permission: 'border8R'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox9.png'),
        widgetName: 'borderBox9',
        name: '边框九',
        permission: 'border9'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox10.png'),
        widgetName: 'borderBox10',
        name: '边框十',
        permission: 'border10'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox11.png'),
        widgetName: 'borderBox11',
        name: '边框十一',
        permission: 'border11'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox12.png'),
        widgetName: 'borderBox12',
        name: '边框十二',
        permission: 'border12'
      },
      {
        src: require('../assets/image/configuration/border/BorderBox13.png'),
        widgetName: 'borderBox13',
        name: '边框十三',
        permission: 'border13'
      }
    ]
  },
  {
    type: 'text',
    icon: '&#xe7f7;',
    name: '文本',
    permission: 'text',
    datas: [
      {
        src: require('../assets/image/configuration/text/basic.png'),
        widgetName: 'widgetBaseText',
        name: '基础文本',
        permission: 'text1'
      },
      {
        src: require('../assets/image/configuration/text/time.png'),
        widgetName: 'widgetTimeText',
        name: '时间文本',
        permission: 'text2'
      },
      {
        src: require('../assets/image/configuration/text/scroll.png'),
        widgetName: 'widgetDigitalScroll',
        name: '数字滚动',
        permission: 'text3'
      },
      {
        src: require('../assets/image/configuration/text/scrollText.png'),
        widgetName: 'widgetScrollText',
        name: '滚动文本',
        permission: 'text4'
      },
      {
        src: require('../assets/image/configuration/text/notice.png'),
        widgetName: 'widgetNoticeText',
        name: '竖向单切换文本',
        permission: 'text5'
      }
    ]
  },
  {
    type: 'image',
    icon: '&#xe7de;',
    name: '图片',
    permission: 'image',
    datas: [
      {
        src: require('../assets/image/configuration/image/img.png'),
        widgetName: 'widgetImage',
        name: '图片',
        permission: 'image1'
      },
      {
        src: require('../assets/image/configuration/image/turn.png'),
        widgetName: 'widgetTurnImage',
        name: '轮播',
        permission: 'image2'
      }
    ]
  },
  {
    type: 'newtable',
    icon: '&#xe7df;',
    name: '表格',
    permission: 'table',
    datas: [
      {
        src: require('../assets/image/configuration/table/tablenew.png'),
        widgetName: 'widgetBasicTable',
        name: '基本轮播表',
        permission: 'table1'
      }
    ]
  },
  {
    type: 'line',
    icon: '&#xe7af;',
    name: '折线图',
    permission: 'line',
    datas: [
      {
        src: require('../assets/image/configuration/line/widgetBaseLine.png'),
        widgetName: 'widgetBaseLine',
        name: '基础折线图',
        permission: 'line1'
      },
      {
        src: require('../assets/image/configuration/line/widgetBaseSmoothLine.png'),
        widgetName: 'widgetBaseSmoothLine',
        name: '基础平滑折线图',
        permission: 'line2'
      },
      {
        src: require('../assets/image/configuration/line/widgetBaseAreaLine.png'),
        widgetName: 'widgetBaseAreaLine',
        name: '基础面积图',
        permission: 'line3'
      },
      {
        src: require('../assets/image/configuration/line/widgetBaseLengthwaysLine.png'),
        widgetName: 'widgetBaseLengthwaysLine',
        name: '基础纵向折线图',
        permission: 'line4'
      },
      {
        src: require('../assets/image/configuration/line/widgetBaseScrollLine.png'),
        widgetName: 'widgetBaseScrollLine',
        name: '区域缩放折线图',
        permission: 'line5'
      },
      {
        src: require('../assets/image/configuration/line/widgetThreeLine.png'),
        widgetName: 'widgetThreeLine',
        name: '3D折线图',
        permission: 'line6'
      },
      {
        src: require('../assets/image/configuration/line/widgetStepLine.png'),
        widgetName: 'widgetStepLine',
        name: '阶梯折线图',
        permission: 'line7'
      },
      {
        src: require('../assets/image/configuration/line/widgetPolarLine.png'),
        widgetName: 'widgetPolarLine',
        name: '极坐标折线图',
        permission: 'line8'
      }
    ]
  },
  {
    type: 'bar',
    icon: '&#xe7b0;',
    name: '柱状图',
    permission: 'bar',
    datas: [
      {
        src: require('../assets/image/configuration/bar/widgetBaseBar.png'),
        widgetName: 'widgetBaseBar',
        name: '基础柱状图',
        permission: 'bar1'
      },
      {
        src: require('../assets/image/configuration/bar/widgetBackgroudBar.png'),
        widgetName: 'widgetBackgroudBar',
        name: '带背景色的柱状图',
        permission: 'bar2'
      },
      {
        src: require('../assets/image/configuration/bar/widgetAlignmentBar.png'),
        widgetName: 'widgetAlignmentBar',
        name: '坐标轴刻度与标签对齐',
        permission: 'bar3'
      },
      {
        src: require('../assets/image/configuration/bar/widgetRadiusBar.png'),
        widgetName: 'widgetRadiusBar',
        name: '圆角柱状图',
        permission: 'bar4'
      },
      {
        src: require('../assets/image/configuration/bar/widgetLengthwaysBar.png'),
        widgetName: 'widgetLengthwaysBar',
        name: '横向柱状图',
        permission: 'bar5'
      },
      {
        src: require('../assets/image/configuration/bar/widgetStackBar.png'),
        widgetName: 'widgetStackBar',
        name: '堆积柱状图',
        permission: 'bar6'
      },
      {
        src: require('../assets/image/configuration/bar/widgetScrollBar.png'),
        widgetName: 'widgetScrollBar',
        name: '区域缩放柱状图',
        permission: 'bar7'
      },
      {
        src: require('../assets/image/configuration/bar/widgetPolarBar.png'),
        widgetName: 'widgetPolarBar',
        name: '极坐标柱状图',
        permission: 'bar8'
      },
      {
        src: require('../assets/image/configuration/bar/widgetPolarStackBar.png'),
        widgetName: 'widgetPolarStackBar',
        name: '极坐标堆叠柱状图',
        permission: 'bar9'
      },
      {
        src: require('../assets/image/configuration/bar/widgetRoundBar.png'),
        widgetName: 'widgetRoundBar',
        name: '圆角环形图',
        permission: 'bar10'
      },
      {
        src: require('../assets/image/configuration/bar/widgetThreeDBar.png'),
        widgetName: 'widgetThreeBar',
        name: '3D柱状图',
        permission: 'bar11'
      },
      {
        src: require('../assets/image/configuration/bar/widgetOneColorBar.png'),
        widgetName: 'widgetOneColorBar',
        name: '单柱颜色柱状图',
        permission: 'bar12'
      },
      {
        src: require('../assets/image/configuration/bar/widgetFloorBar.png'),
        widgetName: 'widgetFloorBar',
        name: '瀑布图',
        permission: 'bar13'
      },
      {
        src: require('../assets/image/configuration/bar/widgetBorderBar.png'),
        widgetName: 'widgetBorderBar',
        name: '描边柱状图',
        permission: 'bar14'
      },
      {
        src: require('../assets/image/configuration/bar/widgetSideBar.png'),
        widgetName: 'widgetSideBar',
        name: '间隙柱状图',
        permission: 'bar15'
      }
    ]
  },
  {
    type: 'pie',
    icon: '&#xe78e;',
    name: '饼图',
    permission: 'pie',
    datas: [
      {
        src: require('../assets/image/configuration/pie/widgetBasePie.png'),
        widgetName: 'widgetBasePie',
        name: '基础饼图',
        permission: 'pie1'
      },
      {
        src: require('../assets/image/configuration/pie/widgetAnnulusPie.png'),
        widgetName: 'widgetAnnulusPie',
        name: '环形图',
        permission: 'pie2'
      },
      {
        src: require('../assets/image/configuration/pie/widgetRosetypePie.png'),
        widgetName: 'widgetRosetypePie',
        name: '南丁格尔图',
        permission: 'pie3'
      },
      {
        src: require('../assets/image/configuration/pie/widgetPadAnglePie.png'),
        widgetName: 'widgetPadAnglePie',
        name: '扇区间隙饼图',
        permission: 'pie4'
      }
    ]
  },
  {
    type: 'radar',
    icon: '&#xe7dc;',
    name: '雷达图',
    permission: 'radar',
    datas: [
      {
        src: require('../assets/image/configuration/radar/widgetBaseRadar.png'),
        widgetName: 'widgetBaseRadar',
        name: '基础雷达图',
        permission: 'radar1'
      },
      {
        src: require('../assets/image/configuration/radar/widgetCircleRadar.png'),
        widgetName: 'widgetCircleRadar',
        name: '圆形雷达图',
        permission: 'radar2'
      }
    ]
  },
  {
    type: 'funnel',
    icon: '&#xe6a9;',
    name: '漏斗图',
    permission: 'funnel',
    datas: [
      {
        src: require('../assets/image/configuration/funnel/widgetBaseFunnel.png'),
        widgetName: 'widgetBaseFunnel',
        name: '基础漏斗图',
        permission: 'funnel1'
      }
    ]
  },
  {
    type: 'guage',
    icon: '&#xeb72;',
    name: '仪表',
    permission: 'guage',
    datas: [
      {
        src: require('../assets/image/configuration/guage/guage.png'),
        widgetName: 'widgetSimpleGuage',
        name: '基本仪表',
        permission: 'guage1'
      },
      {
        src: require('../assets/image/configuration/guage/guage-animation.png'),
        widgetName: 'widgetDetailGuage',
        name: '详情仪表',
        permission: 'guage2'
      },
      {
        src: require('../assets/image/configuration/guage/guage-linear.png'),
        widgetName: 'widgetLinearGuage',
        name: '渐变仪表',
        permission: 'guage3'
      },
      {
        src: require('../assets/image/configuration/guage/guage-percent.png'),
        widgetName: 'widgetPercentGuage',
        name: '百分比环',
        permission: 'guage4'
      }
    ]
  },
  {
    type: 'other',
    icon: '&#xeb71;',
    name: '其它',
    permission: 'other',
    datas: [
      {
        src: require('../assets/image/configuration/other/screen.png'),
        widgetName: 'widgetOtherScreen',
        name: '全屏',
        permission: 'screen'
      },
      {
        src: require('../assets/image/configuration/other/control.png'),
        widgetName: 'widgetOtherControl',
        name: '组件显示',
        permission: 'control'
      },
      {
        src: require('../assets/image/configuration/other/mix-line-bar.png'),
        widgetName: 'widgetMixLineBar',
        name: '多类型混合',
        permission: 'mixLineBar'
      },
      {
        src: require('../assets/image/configuration/wordcloud/widgetBaseWordcloud.png'),
        widgetName: 'widgetBaseWordcloud',
        name: '词云图',
        permission: 'wordCloud'
      },
      {
        src: require('../assets/image/configuration/scatter/widgetBaseScatter.png'),
        widgetName: 'widgetBaseScatter',
        name: '散点图',
        permission: 'scatter'
      }
    ]
  }
]

const components: any = {
  // image: require('./image').default,
  group: require('./group').default,
  line: require('./line').default,
  bar: require('./bar').default,
  pie: require('./pie').default,
  radar: require('./radar').default,
  funnel: require('./funnel').default,
  scatter: require('./scatter').default,
  wordcloud: require('./wordcloud').default,
  sys: require('./sys').default,
  ...image,
  ...polarbar,
  ...polarline,
  ...border,
  ...text,
  ...form,
  ...newtable,
  ...other,
  ...guage,
  ...decoration
}

export default components
