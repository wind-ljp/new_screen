/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-05-29 13:43:08
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-05-29 14:32:48
 */
import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'widgetPercentGuage',
  label: '百分比环',
  ...config,
  configureValue: {
    ...config.configureValue,
    percenLabel: '%',
    arcLineWidth: 25,
    gradient1: '#03c2fd',
    gradient2: '#1ed3e5',
    gradient3: '#2fded6',
    labelColor: '#1ed3e5',
    labelFontSize: 35
  },
  dataValue: {
    ...config.dataValue,
		mock: {
			data: 65
		}
	}
};