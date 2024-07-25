/*
 * echarts图表相关处理
 * @Author:  liaojp
 * @Date: 2022-08-11 11:53:54
 * @Last Modified by:  liaojp
 * @Last Modified time: 2022-08-16 17:24:51
 */
interface result {
  legendData: any[]
  xAxisData: any[]
  yAxisData: any[]
  series: any[]
}
/**
 * 根据传入的配置，返回适合echarts的配置项
 * @param style 配置项
 * @returns 返回echarts的配置项
 */
export function handleEchartsOption(style: any): any {
  let linearPosition = {
    x: 0,
    y: 0,
    x2: 0,
    y2: 1
  }
  if (style?.xAxisType === 'value' && style?.yAxisType === 'category') {
    linearPosition = {
      x: 0,
      y: 0,
      x2: 1,
      y2: 0
    }
  }
  return {
    color: style?.isLinearColor
      ? [
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor1.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor2.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor3.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor4.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor5.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor6.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor7.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          ...linearPosition,
          colorStops: style?.themeLinearColor8.map(
            (i: { offset: string; color: string }) => {
              return {
                offset: parseFloat(i.offset),
                color: i.color
              }
            }
          ),
          global: false // 缺省为 false
        }
      ]
      : [
        style?.themeColor1,
        style?.themeColor2,
        style?.themeColor3,
        style?.themeColor4,
        style?.themeColor5,
        style?.themeColor6,
        style?.themeColor7,
        style?.themeColor8
      ],
    title: {
      show: style?.titleTextShow,
      text: style?.titleText,
      textStyle: {
        color: style?.titleTextColor,
        fontWeight: style?.titleTextFontWeight,
        fontSize: style?.titleTextFontSize,
        fontFamily: style?.titleTextFontFamily,
        lineHeight: style?.titleTextLineHeight
      }
    },
    legend: {
      show: style?.legendShow,
      orient: style?.legendOrient,
      type: style?.legendType,
      icon: style?.legendIcon,
      left: style?.legendLeft,
      top: style?.legendTop,
      textStyle: {
        fontSize: style?.legendFontSize,
        color: style?.legendColor
      }
    },
    grid: {
      show: style?.gridShow,
      left: style?.gridLeft,
      right: style?.gridRight,
      top: style?.gridTop,
      bottom: style?.gridBottom,
      borderColor: style?.gridBorderColor
    },
    xAxis: {
      show: style?.xAxisShow,
      type: style?.xAxisType,
      name: style?.xAxisName,
      nameLocation: style?.xAxisNameLocation,
      nameTextStyle: {
        color: style?.axisNameColor,
        fontWeight: style?.xAxisNameTextStyleFontWeight,
        lineHeight: style?.xAxisNameTextStyleLineHeight,
        fontFamily: style?.xAxisNameTextStyleFontFamily,
        fontSize: style?.xAxisNameTextStyleFontSize
      },
      nameRotate: style?.xAxisNameRotate,
      boundaryGap:
        style?.xAxisType === 'category'
          ? style?.xAxisBoundaryGap
          : style?.xAxisBoundaryGap
            ? 1
            : 0,
      scale: style?.xAxisScale,
      axisTick: {
        show: style?.xAxisTickShow,
        alignWithLabel: style?.xAxisAlignWithLabel,
        lineStyle: {
          color: style?.axisLineColor
        }
      },
      axisLine: {
        show: style?.xAxisLineShow,
        lineStyle: {
          color: style?.axisLineColor
        }
      },
      axisLabel: {
        show: style?.xAxisLabelShow,
        color: style?.axisLabelColor,
        rotate: style?.xAxisLabelRotate
      },
      splitLine: {
        show: style?.xAxisSplitLineShow,
        lineStyle: {
          color: style?.splitLineColor
        }
      },
      splitArea: {
        show: style?.xAxisSplitAreaShow,
        areaStyle: {
          color: ['#fff', '#000'],
          opacity: style?.xAxisSplitAreaOpacity
            ? style?.xAxisSplitAreaOpacity / 100
            : 0.1
        }
      },
      axisPointer: {
        show: style?.xAxisPointerShow,
        lineStyle: {
          color: style?.axisPointerColor
        }
      }
    },
    yAxis: {
      show: style?.yAxisShow,
      type: style?.yAxisType,
      name: style?.yAxisName,
      nameLocation: style?.yAxisNameLocation,
      nameTextStyle: {
        color: style?.axisNameColor,
        fontWeight: style?.yAxisNameTextStyleFontWeight,
        lineHeight: style?.yAxisNameTextStyleLineHeight,
        fontFamily: style?.yAxisNameTextStyleFontFamily,
        fontSize: style?.yAxisNameTextStyleFontSize
      },
      nameRotate: style?.yAxisNameRotate,
      boundaryGap:
        style?.yAxisType === 'category'
          ? style?.yAxisBoundaryGap
          : style?.yAxisBoundaryGap
            ? 1
            : 0,
      scale: style?.yAxisScale,
      axisTick: {
        show: style?.yAxisTickShow,
        alignWithLabel: style?.yAxisAlignWithLabel,
        lineStyle: {
          color: style?.axisLineColor
        }
      },
      axisLine: {
        show: style?.yAxisLineShow,
        lineStyle: {
          color: style?.axisLineColor
        }
      },
      axisLabel: {
        show: style?.yAxisLabelShow,
        color: style?.axisLabelColor,
        rotate: style?.yAxisLabelRotate
      },
      splitLine: {
        show: style?.yAxisSplitLineShow,
        lineStyle: {
          color: style?.splitLineColor
        }
      },
      splitArea: {
        show: style?.yAxisSplitAreaShow,
        areaStyle: {
          color: ['#fff', '#000'],
          opacity: style?.yAxisSplitAreaOpacity
            ? style?.yAxisSplitAreaOpacity / 100
            : 0.1
        }
      },
      axisPointer: {
        show: style?.yAxisPointerShow,
        lineStyle: {
          color: style?.axisPointerColor
        }
      }
    },
    line: {
      series: {
        type: 'line',
        showSymbol: style?.showSymbol,
        symbol: style?.symbol,
        symbolSize: style?.symbolSize,
        smooth: style?.lineSmooth,
        lineStyle: {
          width: style?.lineWidth
        },
        label: {
          show: style?.seriesLabelShow,
          position: style?.seriesLabelPosition,
          color: style?.seriesLabelColor
        },
        stack: style?.seriesStackValue,
        // areaStyle: style?.lineAreaStyle
        //   ? {
        //       opacity: style?.lineAreaStyleOpacity
        //         ? style?.lineAreaStyleOpacity / 100
        //         : 0.7
        //     }
        //   : null,
        areaStyle: {
          opacity: style?.lineAreaStyle
            ? style?.lineAreaStyleOpacity
              ? style?.lineAreaStyleOpacity / 100
              : 0.7
            : 0,
          color: style?.lineAreaStyle
            ? style?.areaIsLinear
              ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: style?.lineAreaLinearColor
                  ? style?.lineAreaLinearColor.map(
                    (i: { offset: string; color: string }) => {
                      return {
                        offset: parseFloat(i.offset),
                        color: i.color
                      }
                    }
                  )
                  : [],
                global: false // 缺省为 false
              }
              : style?.lineAreaColor
            : null
          // color: {
          //   type: 'linear',
          //   x: 0,
          //   y: 0,
          //   x2: 0,
          //   y2: 1,
          //   colorStops: style?.lineAreaStyle
          //     ? style?.lineAreaColor
          //       ? style?.lineAreaColor.map(
          //           (i: { offset: string; color: string }) => {
          //             return {
          //               offset: parseFloat(i.offset),
          //               color: i.color
          //             }
          //           }
          //         )
          //       : []
          //     : [],
          //   global: false // 缺省为 false
          // }
        }
      }
    },
    bar: {
      series: {
        type: 'bar',
        barWidth: style?.barWidth,
        showBackground: style?.barShowBackground,
        backgroundStyle: {
          color: style?.barBackgroundStyleColor,
          borderColor: style?.barBackgroundStyleBorderColor,
          borderWidth: style?.barBackgroundStyleBorderWidth,
          borderType: style?.barBackgroundStyleBorderType,
          borderRadius: style?.barBorderRadius
        },
        itemStyle: {
          borderRadius: style?.barBorderRadius || 0
        },
        label: {
          show: style?.seriesLabelShow,
          position: style?.seriesLabelPosition,
          color: style?.seriesLabelColor
        },
        stack: style?.seriesStackValue
      }
    },
    pie: {
      series: {
        type: 'pie',
        label: {
          show: style?.seriesLabelShow,
          position: style?.seriesLabelPosition,
          color: style?.seriesLabelColor
        },
        roseType: style?.seriesRoseType,
        itemStyle: {
          borderRadius: (style?.seriesIsPadAngle && style?.seriesPadAngle) || style?.seriesRoseType ? 5 : 0
        },
        radius: [
          `${style?.seriesInsideRadius || 0}%`,
          `${style?.seriesAutsideRadius || 0}%`
        ],
        padAngle: style?.seriesIsPadAngle ? style?.seriesPadAngle : 0
      }
    },
    radar: {
      config: {
        shape: style?.radarShape,
        radius: (style?.radarRadius || 75) + '%',
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: style?.radarAxisLinelColor
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: style?.radarSplitLineColor
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              style?.radarSplitAreaOddColor,
              style?.radarSplitAreaEvenColor
            ]
          }
        }
      },
      series: {
        type: 'radar',
        showSymbol: style?.showSymbol,
        symbol: style?.symbol,
        symbolSize: style?.symbolSize
      }
    },
    funnel: {
      series: {
        type: 'funnel',
        label: {
          show: style?.seriesLabelShow,
          position: style?.seriesLabelPosition,
          color: style?.seriesLabelColor
        },
        orient: style?.funnelOrient,
        sort: style?.funnelSort,
        gap: style?.funnelGap
      }
    },
    scatter: {
      series: {
        type: 'scatter',
        colorBy: style?.scatterColorBy,
        showSymbol: style?.showSymbol,
        symbol: style?.symbol,
        symbolSize: style?.symbolSize,
        label: {
          show: style?.seriesLabelShow,
          position: style?.seriesLabelPosition,
          color: style?.seriesLabelColor
        }
      }
    },
    emap: {
      config: {
        visualMap: style?.emapVisualMapShow
          ? {
            show: style?.emapVisualMapShow,
            itemWidth: 10,
            itemHeight: 80,
            color: [
              style?.emapVisualMapStartColor,
              style?.emapVisualMapEndColor
            ],
            textStyle: {
              color: style?.emapVisualMapFontColor
            },
            text: ['高', '低'],
            left: style?.emapVisualMapLeft,
            orient: style?.emapVisualMapOrient,
            handleStyle: {
              opacity: 0
            }
          }
          : null,
        geo: {
          type: 'map',
          map: '100000', //chinaMap需要和registerMap中的第一个参数保持一致
          roam: false, // 设置允许缩放以及拖动的效果
          top: style?.emapTop ? `${style?.emapTop}%` : '0%',
          label: {
            show: style?.emapLabelShow, //展示标签
            color: style?.emapFontColor,
            fontSize: style?.emapFontSize || 12
          },
          itemStyle: {
            borderColor: style?.emapBorderColor,
            areaColor: style?.emapAreaColor,
            borderWidth: style?.emapBorderSize
          },
          emphasis: {
            label: {
              color: style?.emapHighFontColor
            },
            itemStyle: {
              areaColor: style?.emapHighAreaColor,
              borderColor: style?.emapHighBorderColor
            }
          },
          select: {
            label: {
              color: style?.emapFontColor,
              fontSize: style?.emapFontSize || 12
            },
            itemStyle: {
              borderColor: style?.emapBorderColor,
              areaColor: style?.emapAreaColor
            }
          },
          zoom: style?.emapZoom || 1
        }
      },
      series: {}
    },
    wordcloud: {
      series: {
        type: 'wordCloud',
        shape: 'circle',
        width: '100%',
        height: '100%',
        gridSize: style?.wordcloudGridSize || 0,
        sizeRange: [10, style?.wordcloudMaxFontSize || 32],
        rotationRange: [-90, 90],
        textStyle: {
          fontFamily: style?.wordcloudFontFamily,
          fontWeight: style?.wordcloudFontWeight,
          color: function () {
            return (
              'rgb(' +
              [
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255)
              ].join(',') +
              ')'
            )
          }
        },
        emphasis: {
          focus: 'self'
        }
      }
    },
    series: []
  }
}

/**
 * 处理数据
 * @param data 数据
 * @returns
 */
export function handleData(data: any[]): result {
  let legendData: any[] = []
  let xAxisData: any[] = []
  let yAxisData: any[] = []
  let series: any[] = []

  if (Array.isArray(data) && data.length) {
    data.forEach((item: any, index: number) => {
      legendData.push(item.seriesName)
      if (item.data && item.data.length) {
        let datas: any[] = []
        item.data.forEach((subItem: any) => {
          if (index === 0) {
            xAxisData.push(subItem.name)
            yAxisData.push(subItem.name)
          }
          datas.push(subItem.value)
        })
        if (item.type) {
          series.push({
            name: item.seriesName,
            data: datas,
            hidden: item.hidden || false,
            step: item.step || null,
            type: item.type
          })
        } else {
          series.push({
            name: item.seriesName,
            data: datas,
            hidden: item.hidden || false,
            step: item.step || null
          })
        }
      }
    })
  }

  return {
    legendData,
    xAxisData,
    yAxisData,
    series
  }
}
