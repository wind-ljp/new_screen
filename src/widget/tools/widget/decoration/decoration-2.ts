import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration2',
  label: '装饰二',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: '#3faacb',
    secondDecorationColor: '#fff'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 200,
		height: 5
	}
};