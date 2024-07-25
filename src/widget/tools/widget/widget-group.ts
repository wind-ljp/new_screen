/*
 * widget-group组件的默认配置值
 * @Author:  liaojp
 * @Date: 2022-08-10 10:05:22
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 16:13:46
 */
// 获取本地环境的数据
import baseConfiguration from '../base-configuration'
const { animate } = baseConfiguration

const temp = {
  code: 'widgetGroup',
  type: 'group',
  label: '组件',
  // 配置项值
  configureValue: {
    styleDisplay: 'block',
    backgroundColor: 'rgba(15,32,212, 1)',
    ...animate.configureValue,
    styleBoxInset: true,
    styleBoxShadowX: 0,
    styleBoxShadowY: 0,
    styleBoxShadowF: 10,
    styleBoxShadowC: 'rgba(15,32,212,0.5)',
    styleBorderStyle: 'solid',
    styleBorderWidth: 1,
    styleBorderColor: 'rgba(15,32,212, 1)',
    styleBorderTopLeftRadius: 5,
    styleBorderTopRightRadius: 5,
    styleBorderBottomLeftRadius: 5,
    styleBorderBottomRightRadius: 5,
    groupBorderType: 18,
    isScreenHead: false,
    showWidgetStatus: false,
    iconHeight: 33,
    iconWidth: 61,
    showIconPosition: 'bottom',
    startAngle: 75,
    polarF: 30,
    polarS: '80%',
    polarStack: true,
    axis3LabelColor: '#900',
    axis3TextColor: '#900',
    x3Name: 'X',
    y3Name: 'Y',
    z3Name: 'Z',
    g3Max: 5000,
    axis2Status: true,
    startAngleLine: 0,
    axis3LabelColorLine: '#900',
    axis3TextColorLine: '#900',
    x3NameLine: 'X',
    y3NameLine: 'Y',
    z3NameLine: 'Z',
    g3MaxLine: 5000,
    axis2StatusLine: true
  },
  // 坐标值
  coordinateValue: {
    left: 0,
    top: 0,
    width: 467,
    height: 346
  },
  // 数据值
  dataValue: {
    useInterface: false,
    dataType: 'dynamic',
    mock: {
      value: '文本框',
      imgSrc: '/img.png',
      series: [
        {
          seriesName: "Email",
          data: [
            {
              name: "Mon",
              value: 120
            },
            {
              name: "Tue",
              value: 132
            },
            {
              name: "Wed",
              value: 101
            }
          ]
        }
      ],
      radio: [
        { label: '选项一', value: '0' },
        { label: '选项二', value: '1' },
        { label: '选项三', value: '2' }
      ],
      tableData: {
        body: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ],
        header: ['列1', '列2', '列3']
      },
      scrollText: [
        '第一行第一行第一行第一行第一行第一行第一行第一行第一行',
        '第二行第二行第二行第二行第二行第二行第二行第二行第二行',
        '第三行第三行第三行第三行第三行第三行第三行第三行第三行',
        '第四行第四行第四行第四行第四行第四行第四行第四行第四行',
        '第五行第五行第五行第五行第五行第五行第五行第五行第五行'
      ]
    },
    url: '',
    method: 'post',
    params: {key: ''}
  }
}

export default temp;
