/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-02-06 14:33:43
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-02-06 14:38:23
 */
import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetOtherScreen',
	label: '全屏',
	...config,
	configureValue: {
    ...config.configureValue
  }
};