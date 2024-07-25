/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-12-27 16:43:43
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-12-27 16:58:32
 */
import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetPublicBorder',
	label: '自定义SVG边框',
	...config,
	configureValue: {
    ...config.configureValue,
		svgAddress: ''
  }
};