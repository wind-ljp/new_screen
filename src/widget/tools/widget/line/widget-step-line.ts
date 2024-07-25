/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-10-10 13:39:45
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-10 13:43:46
 */
import lineConfig from './index'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  code: 'widgetStepLine',
  label: '阶梯折线图',
  ...lineConfig,
  dataValue: {
    ...lineConfig.dataValue,
    mock: {
      data: [
        {
          step: 'start',
          seriesName: 'Email',
          data: [
            {
              name: 'Mon',
              value: 120
            },
            {
              name: 'Tue',
              value: 132
            },
            {
              name: 'Wed',
              value: 101
            },
            {
              name: 'Thu',
              value: 134
            },
            {
              name: 'Fri',
              value: 90
            },
            {
              name: 'Sat',
              value: 230
            },
            {
              name: 'Sun',
              value: 210
            }
          ]
        },
        {
          step: 'middle',
          seriesName: 'Direct',
          data: [
            {
              name: 'Mon',
              value: 220
            },
            {
              name: 'Tue',
              value: 182
            },
            {
              name: 'Wed',
              value: 191
            },
            {
              name: 'Thu',
              value: 234
            },
            {
              name: 'Fri',
              value: 290
            },
            {
              name: 'Sat',
              value: 330
            },
            {
              name: 'Sun',
              value: 310
            }
          ]
        },
        {
          step: 'end',
          seriesName: 'Day',
          data: [
            {
              name: 'Mon',
              value: 320
            },
            {
              name: 'Tue',
              value: 282
            },
            {
              name: 'Wed',
              value: 291
            },
            {
              name: 'Thu',
              value: 334
            },
            {
              name: 'Fri',
              value: 390
            },
            {
              name: 'Sat',
              value: 430
            },
            {
              name: 'Sun',
              value: 410
            }
          ]
        }
      ]
    }
  }
}
