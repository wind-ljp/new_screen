/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-02-06 14:34:01
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-02-06 14:38:06
 */
import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetOtherControl',
	label: '组件显示',
	...config,
	configureValue: {
    ...config.configureValue
  }
};