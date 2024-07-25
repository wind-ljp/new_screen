/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-12 13:45:58
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-13 11:13:13
 */
import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	code: 'widgetTurnImage',
	label: '轮播',
	...config,
	configureValue: {
		...config.configureValue,
		slidesPerView: 1,
		spaceBetween: 0,
		navigation: false,
		pagination: true,
		direction: 'horizontal',
		mousewheel: true,
		effect: 'cards',
		loop: false
	},
	dataValue: {
		...config.dataValue,
		field: 'data',
		mock: {
			data: [
				{
					url: '/img.png',
					ad: 'https://www.baidu.com/'
				},
				{
					url: '/img.png',
					ad: 'https://www.baidu.com/'
				},
				{
					url: '/img.png',
					ad: 'https://www.baidu.com/'
				}
			]
		}
	}
};