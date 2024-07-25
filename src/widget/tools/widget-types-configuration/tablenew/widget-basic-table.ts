/*
 * @Descripttion: file content
 * @Author: liaojp
 * @CreatedDate: Do not Edit
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-01-16 17:05:18
 */
import baseConfiguration from '../../base-configuration';
const { data } = baseConfiguration;

const tablenew = {
	configure: [
		{
			componentName: 'InputNumber',
			label: '显示行数',
			name: 'rowNum',
			required: false,
			min: 0,
			placeholder: '5'
		},
    {
      componentName: 'Switch',
      label: '显示行号',
      name: 'index',
      required: false
    },
    {
      componentName: 'Input',
      label: '行号表头',
      name: 'indexHeader',
      required: false
    },
    {
			componentName: 'InputNumber',
			label: '轮播间隔(ms)',
			name: 'waitTime',
			required: false,
			min: 0,
			placeholder: '2000'
		},
    {
      componentName: 'Switch',
      label: '悬浮暂停',
      name: 'hoverPause',
      required: false,
      tooltip: '预览页生效'
    },
    {
      componentName: 'SketchPicker',
      label: '表头背景色',
      name: 'headerBGC',
      required: false,
      placeholder: '请选择背景色'
    },
    {
      componentName: 'InputNumber',
      label: '表头高度',
      name: 'headerHeight',
      required: false,
      placeholder: '55'
    },
		{
      componentName: 'SketchPicker',
      label: '奇数行背景色',
      name: 'oddRowBGC',
      required: false,
      placeholder: '请选择奇数背景色'
    },
    {
      componentName: 'SketchPicker',
      label: '偶数行背景色',
      name: 'evenRowBGC',
      required: false,
      placeholder: '请选择偶数行背景色'
    },
    [
      {
        name: '列宽',
        list: [
          {
            componentName: 'InputNumber',
            label: '第一列(px)',
            name: 'columnWidth1',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第二列(px)',
            name: 'columnWidth2',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第三列(px)',
            name: 'columnWidth3',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第四列(px)',
            name: 'columnWidth4',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第五列(px)',
            name: 'columnWidth5',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第六列(px)',
            name: 'columnWidth6',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第七列(px)',
            name: 'columnWidth7',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第八列(px)',
            name: 'columnWidth8',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第九列(px)',
            name: 'columnWidth9',
            required: false,
            min: 0
          },
          {
            componentName: 'InputNumber',
            label: '第十列(px)',
            name: 'columnWidth10',
            required: false,
            min: 0
          }
        ]
      }
    ]
	],
	data: data.configure
};

export default tablenew;
