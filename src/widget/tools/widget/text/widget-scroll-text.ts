import baseConfiguration from '../../base-configuration'
const { data, font } = baseConfiguration

const temp = {
  code: 'widgetScrollText',
  type: 'text',
  label: '滚动文本',
  // 配置项值
  configureValue: {
    styleDisplay: 'block',
    styleFontSize: 16,
    styleLineHeight: 1,
    styleColor: '#fff',
    step: 0,
    direction: 1,
    hoverStop: true,
    styleFontFamily: 'SimSun',
    styleFontWeight: 'normal',
    styleLetterSpacing: 0
  },
  // 坐标值
  coordinateValue: {
    left: 821,
    top: 365,
    width: 500,
    height: 100
  },
  // 数据值
  dataValue: {
    ...data.configureValue,
    field: 'data',
    mock: {
      data: [
        '第一行第一行第一行第一行第一行第一行第一行第一行第一行',
        '第二行第二行第二行第二行第二行第二行第二行第二行第二行',
        '第三行第三行第三行第三行第三行第三行第三行第三行第三行',
        '第四行第四行第四行第四行第四行第四行第四行第四行第四行',
        '第五行第五行第五行第五行第五行第五行第五行第五行第五行'
      ]
    }
  }
}

export default temp
