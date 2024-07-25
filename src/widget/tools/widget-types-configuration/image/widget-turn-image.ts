/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2024-06-12 14:30:30
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-13 11:14:18
 */
import baseConfiguration from '../../base-configuration';
const { animate, data } = baseConfiguration;

const text = {
  // 基础配置项
  configure: [
    [
      ...animate.configure
    ],
    {
      componentName: 'InputNumber',
      label: '展示数量',
      name: 'slidesPerView',
      required: false,
      tooltip: '每页展示数量'
    },
    {
      componentName: 'InputNumber',
      label: '展示间距',
      name: 'spaceBetween',
      required: false,
      tooltip: '生效条件：展示数量大于1'
    },
    {
      componentName: 'Switch',
      label: '手动切换按钮',
      name: 'navigation',
      required: false
    },
    {
      componentName: 'Switch',
      label: '指示点',
      name: 'pagination',
      required: false
    },
    {
      componentName: 'Switch',
      label: '鼠标滚轮控制',
      name: 'mousewheel',
      required: false
    },
    {
      componentName: 'Switch',
      label: '无限循环',
      name: 'loop',
      required: false
    },
    {
      componentName: 'Select',
      label: '轮播方向',
      name: 'direction',
      required: false,
      options: [
        { code: 'horizontal', name: '水平' },
        { code: 'vertical', name: '垂直' }
      ]
    },
    {
      componentName: 'Select',
      label: '切换效果',
      name: 'effect',
      required: false,
      options: [
        { code: 'slide', name: '普通位移切换' },
        { code: 'fade', name: '淡入' },
        { code: 'cube', name: '方块' },
        { code: 'coverflow', name: '3d流' },
        { code: 'flip', name: '3d翻转' },
        { code: 'creative', name: '创意性' },
        { code: 'cards', name: '卡片式' }
      ]
    }
  ],
  data: data.configure
};

export default text;