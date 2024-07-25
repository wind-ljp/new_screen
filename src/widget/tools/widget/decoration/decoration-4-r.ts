import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration4r',
  label: '装饰四-颠倒',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: 'rgba(255, 255, 255, 0.3)',
    secondDecorationColor: 'rgba(255, 255, 255, 0.3)'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 250,
		height: 5
	}
};