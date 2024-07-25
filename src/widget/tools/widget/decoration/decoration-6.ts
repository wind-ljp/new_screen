import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration6',
  label: '装饰六',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: '#7acaec',
    secondDecorationColor: '#7acaec'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 300,
		height: 30
	}
};