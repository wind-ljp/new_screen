import { FC, useMemo, useState, useEffect, useCallback, useRef } from 'react'
// 自定义ehcarts
import CustomEcharts from '../../components/echarts'
// echarts类型
import { IEchartConfig } from '../../types'
// 处理options
import { handleEchartsOption, handleData } from '../../utils/echarts'
import { getStyles } from '../../utils/tools'
import Ajax from '../../service'
// import * as echarts from 'echarts'

interface IEmapProps extends IEchartConfig {
  options: any
  data: any
  field: string
}

const Emap: FC<IEmapProps> = ({ options, data, field }) => {
  const echartInstance = useRef<any>(null)
  // 获取地图实例
  const getEchart = (instance: any) => {
    echartInstance.current = instance
  }

  // 获取所有地国数据
  const [alladcode, setAlladcode] = useState<any>([])
  // 获取所有地国数据
  const [geoJson, setGeoJson] = useState<any>(null)

  const getGeo = useCallback((field: string | number) => {
    Ajax.getGeo({ field: field }).then((res) => {
      if (res) {
        if (field === 'all') {
          setAlladcode(res)
        } else {
          setGeoJson(res)
        }
      }
    })
  }, [])

  // 获取全国数据
  useEffect(() => {
    getGeo('all')
    getGeo('100000_full')
  }, [getGeo])

  const getOption = useMemo(() => {
    const configuration = handleEchartsOption(options)
    let option = {}
    if (geoJson) {
      window.echarts.registerMap('100000', geoJson)
      // let airData = [
      //   { name: '北京市', value: 39.93 },
      //   { name: '天津市', value: 39.13 },
      //   { name: '河北省', value: 147 },
      //   { name: '山西省', value: 39 },
      //   { name: '内蒙古自治区', value: 58 },
      //   { name: '辽宁省', value: 50 },
      //   { name: '吉林省', value: 51 },
      //   { name: '黑龙江省', value: 114 },
      //   { name: '上海市', value: 31.23 },
      //   { name: '江苏省', value: 67 },
      //   { name: '浙江省', value: 84 },
      //   { name: '安徽省', value: 117 },
      //   { name: '福建省', value: 29 },
      //   { name: '江西省', value: 96 },
      //   { name: '山东省', value: 92 },
      //   { name: '河南省', value: 113 },
      //   { name: '湖北省', value: 273 },
      //   { name: '湖南省', value: 175 },
      //   { name: '广东省', value: 38 },
      //   { name: '广西壮族自治区', value: 59 },
      //   { name: '海南省', value: 54 },
      //   { name: '重庆市', value: 66 },
      //   { name: '四川省', value: 58 },
      //   { name: '贵州省', value: 71 },
      //   { name: '云南省', value: 25 },
      //   { name: '西藏自治区', value: 24 },
      //   { name: '陕西省', value: 61 },
      //   { name: '甘肃省', value: 99 },
      //   { name: '青海省', value: 57 },
      //   { name: '宁夏回族自治区', value: 52 },
      //   { name: '新疆维吾尔自治区', value: 84 },
      //   { name: '台湾省', value: 88 },
      //   { name: '香港特别行政区', value: 66 },
      //   { name: '澳门特别行政区', value: 77 }
      // ]
      // let scatterData = [
      //   {
      //     value: [112.549248, 37.857014, 2000]
      //   },
      //   {
      //     value: [117.283042, 31.86119, 3000]
      //   }
      // ]
      // option = {
      //   ...configuration.emap.config,
      //   series: [
      //     {
      //       name: 'a',
      //       data: airData,
      //       type: 'map',
      //       geoIndex: 0
      //     },
      //     {
      //       type: 'effectScatter',
      //       data: scatterData, //配置散点的坐标数据
      //       coordinateSystem: 'geo', //指明散点使用的坐标系统  geo的坐标系统
      //       symbolSize: function (val: any) {
      //         // 涟漪图大小 val就是data中value数组
      //         return val[2] / 200
      //       },
      //       rippleEffect: {
      //         scale: 10,
      //         color: 'blue'
      //       }
      //     }
      //   ],
      //   visualMap: {
      //     min: 0,
      //     max: 300,
      //     inRange: {
      //       color: ['rgba(0,0,0,.4)', '#000'] //控制颜色渐变的范围
      //     },
      //     calculable: true //出现滑块
      //   }
      // }
      if (data && field && data[field] && data[field].length) {
        option = {
          tooltip: {
            trigger: 'item'
          },
          ...configuration.emap.config,
          series: data[field].map((item: any) => ({
            ...item,
            type: 'map',
            geoIndex: 0,
            name: item.seriesName
          }))
        }
      }
    }
    return option
  }, [geoJson, options, data, field])

  return (
    <CustomEcharts
      getEchart={getEchart}
      style={getStyles(options)}
      options={getOption}
    />
  )
}

export default Emap
