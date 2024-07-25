import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'Decoration5',
  label: '装饰五',
  ...config,
  configureValue: {
		...config.configureValue,
		firstDecorationColor: '#3f96a5',
    secondDecorationColor: '#3f96a5'
	},
  coordinateValue: {
    left: 821,
		top: 365,
		width: 300,
		height: 40
	}
};