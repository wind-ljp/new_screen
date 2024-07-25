import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration10',
  label: '装饰十',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: '#00c2ff',
    secondDecorationColor: 'rgba(0, 194, 255, 0.3)'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 150,
		height: 5
	}
};