/*
 * @Description: 模拟接口数据
 * @Author: liaojp
 * @Date: 2022-10-11 19:49:25
 * @LastEditors: liaojp
 * @LastEditTime: 2022-10-12 14:18:53
 * @FilePath: \bigscreen\src\mock\modules\configuration.ts
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import Mock from 'mockjs'
export const configuration = {
  url: '/configuration',
  method: 'get',
  data: {
    code: 0,
    sucess: true,
    data: Mock.mock({
      value: '@csentence(5)',
      series: [
        {
          seriesName: '@ctitle(3)',
          'data|6': [
            {
              name: '@region',
              'value|1-300': 100
            }
          ]
        }
      ],
      'radio|3': [{ label: '@csentence(2)', value: '@increment' }]
    })
  },
  message: '成功'
}
