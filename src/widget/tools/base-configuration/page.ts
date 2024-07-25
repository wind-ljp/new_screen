import { Tooltip } from 'antd';
/*
 * 页面配置
 * @Author:  liaojp
 * @Date: 2022-08-10 10:16:25
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-14 16:23:23
 */
const page = {
  type: 'page',
  label: '页面配置',
  configure: [
    {
      componentName: 'Input',
      label: '屏幕名称',
      name: 'title',
      required: false,
      placeholder: '请输入屏幕名称'
    },
    {
      componentName: 'InputNumber',
      label: '屏幕宽度',
      name: 'width',
      required: false,
      placeholder: '请输入屏幕宽度',
      min: 1366,
      max: 5000
    },
    {
      componentName: 'InputNumber',
      label: '屏幕高度',
      name: 'height',
      required: false,
      placeholder: '请输入屏幕高度',
      min: 768,
      max: 3000
    },
    {
      componentName: 'SetScreenWH',
      label: '获取宽高',
      required: false,
      tooltip: '获取浏览器非全屏下可视区域的宽度和高度，适用于非全屏展示时使用，全屏展示请按屏幕分辨率设置'
    },
    {
      componentName: 'InputNumber',
      label: '横几屏',
      name: 'horizontalNumber',
      required: false,
      min: 1,
      max: 6,
      placeholder: '请输入横几屏'
    },
    {
      componentName: 'InputNumber',
      label: '竖几屏',
      min: 1,
      max: 6,
      name: 'verticalNumber',
      required: false,
      placeholder: '请输入竖几屏'
    },
    {
      componentName: 'SketchPicker',
      label: '背景颜色',
      name: 'backgroundColor',
      required: false,
      placeholder: '请选择背景颜色'
    },
    {
      componentName: 'Input',
      label: '背景图片',
      name: 'backgroundImage',
      required: false,
      placeholder: '请输入背景图片地址'
    },
    {
      componentName: 'UploadBackgroundImage',
      label: '',
      name: 'uploadImage',
      required: false,
      placeholder: ''
    },
    {
      componentName: 'Select',
      label: '维度背景',
      name: 'dimension',
      required: false,
      tooltip: '请注意：显示层级在背景颜色和背景图片之上！',
      options: [
        { code: '2D', name: '二维地图' },
        { code: '3D', name: '三维模型' }
      ]
    },
    {
      componentName: 'Input',
      label: '中心点',
      name: 'center',
      relationFields: 'dimension',
      relationValues: '2D',
      tooltip: '地图显示的中心点坐标，例：117.19635, 36.24093，逗号为英文逗号'
    },
    [{
      name: '贴图参数',
      relationFields: 'dimension',
      relationValues: '2D',
      list: [
        {
          componentName: 'Switch',
          label: '是否显示',
          name: 'showPic',
          required: false
        },
        {
          componentName: 'Input',
          label: '贴图',
          name: 'chartlet',
          tooltip: '在地图上覆盖一层平面图纸',
          relationFields: 'showPic',
          relationValues: 'true'
        },
        {
          componentName: 'UploadChartletImage',
          label: '',
          name: 'uploadImage2',
          required: false,
          relationFields: 'showPic',
          relationValues: 'true'
        },
        {
          componentName: 'Input',
          label: '位置一',
          name: 'location1',
          tooltip: '贴图左上角坐标，例：117.19635, 36.24093，逗号为英文逗号',
          relationFields: 'showPic',
          relationValues: 'true'
        },
        {
          componentName: 'Input',
          label: '位置二',
          name: 'location2',
          tooltip: '贴图右下角坐标，例：117.2035, 36.24764，逗号为英文逗号',
          relationFields: 'showPic',
          relationValues: 'true'
        }]
    },
    {
      name: '矿井区域参数',
      relationFields: 'dimension',
      relationValues: '2D',
      list: [{
        componentName: 'Switch',
        label: '是否显示',
        name: 'showArea',
        required: false
      }, {
        componentName: 'SetMapArea',
        label: '区域设置',
        name: 'setMapArea',
        required: false,
        relationFields: 'showArea',
        relationValues: 'true'
      }]
    }
    ],
    [
      {
        name: '模型参数',
        list: [{
          componentName: 'Input',
          label: '模型地址',
          name: 'threeModelSource',
          tooltip: '点击下方按钮可设置模型地址'
        },
        {
          componentName: 'ModelSet',
          label: '',
          name: 'modelSet'
        },
        {
          componentName: 'Input',
          label: '偏移坐标',
          name: 'posCamera',
          tooltip: '测点设备偏移坐标,以英文逗号进行分割,例: x,y,z  未填写则不偏移'
        }],
        relationFields: 'dimension',
        relationValues: '3D'
      }
    ],
    {
      componentName: 'SetPoint',
      label: '跳转大屏点',
      name: 'axisList',
      relationFields: 'dimension',
      relationValues: '3D'
    },
    {
      componentName: 'TurnScreen',
      label: '轮播界面',
      name: 'turnList',
      tooltip: '编辑状态下才可使用此功能，第一次新增时请先保存后再进入使用此功能，只轮播大屏原生组件，地图及三维模型不进行轮播'
    },
    {
      componentName: 'TextArea',
      label: '屏幕描述',
      name: 'description',
      required: false,
      placeholder: '请输入描述内容'
    },
    [
      {
        name: '屏幕辅助线',
        list: [
          {
            componentName: 'Switch',
            label: '是否显示',
            name: 'showAuxiliary',
            required: false,
            placeholder: '请选择是否显示'
          },
          {
            componentName: 'InputNumber',
            label: '屏幕间隔',
            min: 0,
            max: 20,
            name: 'interval',
            required: false,
            placeholder: '请输入竖几屏'
          },
          {
            componentName: 'SketchPicker',
            label: '线颜色',
            name: 'auxiliaryBorderColor',
            required: false,
            placeholder: '请选择网络线颜色'
          }
        ]
      }
    ]
  ]
}

export default page
