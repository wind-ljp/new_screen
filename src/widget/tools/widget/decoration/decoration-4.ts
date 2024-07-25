import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration4',
  label: '装饰四',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: 'rgba(255, 255, 255, 0.3)',
    secondDecorationColor: 'rgba(255, 255, 255, 0.3)'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 5,
		height: 150
	}
};