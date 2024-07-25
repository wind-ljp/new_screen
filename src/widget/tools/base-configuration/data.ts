/*
 * 数据项配置
 * @Author:  liaojp
 * @Date: 2022-08-10 10:10:09
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-11 14:33:44
 */
// 获取本地环境的数据
const data = {
  // 数据项默认值
  configureValue: {
    useInterface: false,
    dataType: 'mock',
    mock: {
      data: '文本框'
    },
    url: '',
    method: 'post',
    field: 'data',
    params: {
      key: ''
    },
    autoTime: null
  },
  // 数据项配置
  configure: [
    {
      componentName: 'Switch',
      label: '使用组数据',
      name: 'useInterface',
      required: false,
      placeholder: '',
      tooltip: '该组件使用组的接口数据'
    },
    {
      componentName: 'Select',
      label: '请求类型',
      name: 'dataType',
      required: false,
      placeholder: '',
      relationFields: 'useInterface',
      relationValues: 'false',
      options: [
        { code: 'mock', name: 'mock数据' },
        { code: 'dynamic', name: '接口数据' }
      ]
    },
    {
      componentName: 'UploadImage',
      label: '上传图片',
      name: 'uploadImage',
      required: false,
      placeholder: '',
      relationFields: 'dataType',
      relationValues: 'mock',
      tooltip: '请求类型为mock状态时才能使用'
    },
    {
      componentName: 'JsonEdit',
      label: 'mock数据',
      name: 'mock',
      required: false,
      placeholder: '请输入mock数据',
      relationFields: 'dataType,useInterface',
      relationValues: 'mock,false'
    },
    {
      componentName: 'TextArea',
      label: '接口地址',
      name: 'url',
      required: false,
      placeholder: '请输入接口地址',
      relationFields: 'dataType,useInterface',
      relationValues: 'dynamic,false'
    },
    {
      componentName: 'InputNumber',
      label: '刷新时间',
      name: 'autoTime',
      required: false,
      relationFields: 'dataType,useInterface',
      relationValues: 'dynamic,false',
      tooltip: '单位毫秒，不填写则不开启，此功能仅预览页生效！'
    },
    {
      componentName: 'Select',
      label: '请求方式',
      name: 'method',
      required: false,
      placeholder: '',
      relationFields: 'dataType,useInterface',
      relationValues: 'dynamic,false',
      options: [
        { code: 'get', name: 'GET' },
        { code: 'post', name: 'POST' }
      ]
    },
    {
      componentName: 'JsonEdit2',
      label: '请求参数',
      name: 'params',
      required: false,
      relationFields: 'dataType,useInterface',
      relationValues: 'dynamic,false'
    },
    {
      componentName: 'Input',
      label: '对应字段',
      name: 'field',
      required: false,
      placeholder: ''
    }
  ]
}

export default data
