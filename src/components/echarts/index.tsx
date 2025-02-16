import themes from '../../theme'
import { IEchartConfig } from '../../types'
import { memo, useCallback, useEffect, useRef } from 'react'
// import * as echarts from 'echarts'
// import '@utils/echarts-wordcloud'
import { useUpdateEffect } from 'ahooks'

type EChartsType = typeof window.echarts.ECharts;

const Echarts = memo(
  (props: IEchartConfig) => {
    const {
      style,
      getEchart,
      options = {},
      autoplay = {
        interval: 3000
      },
      onEvents,
      theme = 'dark',
      notMerge = true,
      lazyUpdate = false
    } = props
    // 设置echarts主题
    useEffect(() => {
      window.echarts.registerTheme(theme, themes[theme])
    }, [theme])
    // timer
    const timmer = useRef<EChartsType>(0)
    // tooltip auto play current index
    const currentIndex = useRef<number>(-1)
    // echarts dom
    const echartsRef = useRef<HTMLDivElement>(null)
    // echarts 实例
    const echartsInstance = useRef<EChartsType>(null)
    useEffect(() => {
      if (echartsRef.current && (!echartsInstance.current || theme)) {
        echartsInstance.current = window.echarts.init(echartsRef.current, theme)
        // echartsInstance.current = echarts.init(echartsRef.current)
        // 这里主要外面需要获取echarts实例
        typeof getEchart === 'function' && getEchart(echartsInstance.current)
      }
    }, [getEchart, theme, echartsRef])
    // data change update echart
    useEffect(() => {
      if (echartsInstance.current && JSON.stringify(options) !== '{}') {
        // echartsInstance.current.hideLoading()
        echartsInstance.current.setOption(
          {
            ...options,
            tooltip: options.tooltip
              ? {
                  ...options.tooltip
                }
              : {
                  trigger: 'axis',
                  backgroundColor: 'rgba(0,0,0,.6)',
                  borderColor: 'rgba(255,255,255,.2)',
                  padding: [8, 8],
                  textStyle: {
                    color: '#fff'
                  }
                }
          },
          {
            notMerge: notMerge,
            lazyUpdate: lazyUpdate
          }
        )
        // 绑定事件
        if (onEvents && onEvents.length) {
          for (let i = 0; i < onEvents.length; i++) {
            echartsInstance.current.off(onEvents[i].name)
            echartsInstance.current.on(onEvents[i].name, onEvents[i].fn)
          }
        }
      }
    }, [options, echartsInstance, theme, notMerge, lazyUpdate, onEvents, style])
    // auto play function
    const autoPlayHandler = useCallback(() => {
      if (!options.series || !options.series.length) {
        return false
      }
      if (echartsInstance.current && autoplay && autoplay.interval > 0) {
        if (timmer.current) {
          clearInterval(timmer.current)
        }
        timmer.current = setInterval(() => {
          // get series length
          const dataLen =
            options.series && options.series.length
              ? options.series[0]?.data?.length
              : 0
          // 取消之前高亮的图形
          echartsInstance.current.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
          currentIndex.current = (currentIndex.current + 1) % dataLen
          // 高亮当前图形
          echartsInstance.current.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex.current
          })
          // 显示 tooltip
          echartsInstance.current.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex.current
          })
        }, autoplay.interval)
      }
    }, [echartsInstance, timmer, options, autoplay, currentIndex])

    useEffect(() => {
      autoPlayHandler()
      // 鼠标移入事件
      const mouseHander = (e: MouseEvent) => {
        clearInterval(timmer.current)
        // currentIndex.current = e.dataIndex
        // // 取消之前高亮的图形
        // echartsInstance.current.dispatchAction({
        //   type: 'downplay',
        //   seriesIndex: 0
        // })
        // // 高亮当前图形
        // echartsInstance.current.dispatchAction({
        //   type: 'highlight',
        //   seriesIndex: 0,
        //   dataIndex: currentIndex.current
        // })
      }
      // size事件
      const resizeHandler = () => {
        // echartsInstance.current.resize()
      }
      if (echartsInstance.current) {
        // resizeHandler()
        echartsInstance.current.getZr().on('mouseover', mouseHander)
        echartsInstance.current.getZr().on('globalout', autoPlayHandler)
        window.addEventListener('resize', resizeHandler)
      }
      return () => {
        if (echartsInstance.current) {
          clearInterval(timmer.current)
          echartsInstance.current.getZr().off('mouseover', mouseHander)
          echartsInstance.current.getZr().off('globalout', autoPlayHandler)
          window.removeEventListener('resize', resizeHandler)
        }
      }
    }, [autoPlayHandler, echartsInstance, timmer, currentIndex, style])

    useUpdateEffect(() => {
      echartsInstance.current.resize()
    }, [style?.width, style?.height])

    // 销毁图表
    useEffect(() => {
      if (echartsInstance.current) {
        // echartsInstance.current.showLoading('default', {
        //   text: '加载中...',
        //   color: '#1890ff',
        //   maskColor: 'rgba(0,0,0,0)',
        //   textColor: '#1890ff',
        //   spinnerRadius: 6,
        //   lineWidth: 3
        // })
      }
      return () => {
        if (echartsInstance.current) {
          echartsInstance.current.dispose()
        }
      }
    }, [echartsInstance, theme])
    return <div style={style} className='app-echarts' ref={echartsRef}></div>
  },
  (a, b) => {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      return true
    }
    return false
  }
)

export default Echarts
