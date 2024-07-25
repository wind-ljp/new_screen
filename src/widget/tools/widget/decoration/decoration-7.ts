import config from './index';
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration7',
  label: '装饰七',
  ...config,
	configureValue: {
		...config.configureValue,
		firstDecorationColor: '#1dc1f5',
    secondDecorationColor: '#1dc1f5'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 150,
		height: 30
	},
  dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {
			data: 'Decoration7'
		}
	}
};