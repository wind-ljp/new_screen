import config from './index';
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration11',
  label: '装饰十一',
  ...config,
	configureValue: {
		...config.configureValue,
		firstDecorationColor: '#1a98fc',
    secondDecorationColor: '#2cf7fe'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 200,
		height: 60
	},
  dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {
			data: 'Decoration11'
		}
	}
};