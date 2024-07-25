import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  type: 'sys',
  // 默认配置项
  configureValue: {
    styleDisplay: 'block',
    styleFontSize: 16,
    styleColor: '#fff',
    styleFontFamily: 'SimSun',
    styleFontWeight: 'normal',
    styleLetterSpacing: 0,
    componentType: 'comp1',
    leftDistance: 10,
    bottomDistance: 0
  },
  // 坐标值
	coordinateValue: {
		left: 768,
		top: 3,
		width: 900,
		height: 53
	},
  // 数据值
	dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {}
	}
}