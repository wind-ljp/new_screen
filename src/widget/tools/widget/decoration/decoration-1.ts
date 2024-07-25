import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration1',
  label: '装饰一',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: '#fff',
    secondDecorationColor: '#0de7c2'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 200,
		height: 50
	}
};