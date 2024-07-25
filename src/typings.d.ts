/*
 * @Descripttion: file content
 * @Author: liaojp
 * @CreatedDate: Do not Edit
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-06-06 10:22:29
 */
declare module 'three';
declare module 'three/*';
declare module 'tweenjs/*';
declare module '@jiaminghi/*';
declare module '@jiaicon/*';
declare module '@careteen/*';
declare module 'rc-color-picker*';
declare module 'react-linear-gradient-picker';
declare module 'react-linear-gradient-picker/*';
declare module 'browser-md5-file';
declare module 'leaflet';
declare module 'coordtransform'
declare interface Window {
  BMapGL: any;
  Tmodel: any;
  renderNum: any;
  BMAP_SATELLITE_MAP: any;
  echarts: any,
  sysTitle: string,
  sysName: any,
  sysUrl: any,
  smallTitle: any,
  previewTitle: any,
  listTitle: any,
  configTitle: any
  chartPermission: any
  menuTitle: any
}

declare interface IScreen {
  projectName: string
  width: number | string
  height: number | string
  horizontalNumber: number
  verticalNumber: number
  title: string
  description: string
  backgroundColor: string
  backgroundImage: string
  showAuxiliary: boolean
  auxiliaryBorderColor: string
  interval: number
  dimension: string,
  threeModelSource: string,
  chartlet?: string,
  posCamera?: string,
  axisList?: string,
  turnList?: string,
  center?: string,
  location1?: string,
  location2?: string,
  showPic?: boolean,
  showArea?: boolean,
  setMapArea?: string
}