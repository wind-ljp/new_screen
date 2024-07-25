import config from './index';
import baseConfiguration from '../../base-configuration'
const { data } = baseConfiguration

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration9',
  label: '装饰九',
  ...config,
	configureValue: {
		...config.configureValue,
		firstDecorationColor: 'rgba(3, 166, 224, 0.8)',
    secondDecorationColor: 'rgba(3, 166, 224, 0.5)'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 150,
		height: 150
	},
  dataValue: {
		...data.configureValue,
		field: 'data',
		mock: {
			data: 66
		}
	}
};