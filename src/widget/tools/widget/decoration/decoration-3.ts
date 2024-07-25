import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration3',
  label: '装饰三',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: '#7acaec',
    secondDecorationColor: 'transparent'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 250,
		height: 30
	}
};