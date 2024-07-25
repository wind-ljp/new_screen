/*
 * 配置入口文件
 * @Author:  liaojp
 * @Date: 2022-08-10 10:21:45
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-10 10:38:40
 */
// 基础配置
import baseConfiguration from './base-configuration';
// 类型的配置
import widgetTypesConfiguration from './widget-types-configuration';
// 默认配置
import widgetConfiguration from './widget';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseConfiguration,
	widgetTypesConfiguration,
	widgetConfiguration
};
