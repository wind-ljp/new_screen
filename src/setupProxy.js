/*
 * @Author: liaojingping
 * @Date: 2022-11-25 12:44:41
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-02-05 16:19:42
 * @FilePath: \配置大屏\src\setupProxy.js
 * @Description: 本地代理
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved.
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/bigscreen', {
      target: 'http://192.168.16.7:18080',
      // target: 'http://192.168.16.11:18080',
      changeOrigin: true
      // pathRewrite: { '^/geo': '' }
    }),
    createProxyMiddleware('/userSystem', {
      target: 'http://192.168.16.7:18080',
      // target: 'http://192.168.16.11:18080',
      changeOrigin: true
    }),
    createProxyMiddleware('/kj418', {
      target: 'http://192.168.16.7:18080',
      changeOrigin: true
    }),
    createProxyMiddleware('/microseism', {
      target: 'http://192.168.16.7:18080',
      changeOrigin: true
    }),
    createProxyMiddleware('/waterPro', {
      target: 'http://192.168.16.7:18080',
      changeOrigin: true
    }),
    createProxyMiddleware('/waterRisk', {
      target: 'http://192.168.16.7:18080',
      changeOrigin: true
    }),
    createProxyMiddleware('/geo', {
      target: 'http://192.168.16.7:18080',
      // target: 'http://192.168.16.11:18080',
      changeOrigin: true
    }),
    createProxyMiddleware('/huahong', {
      target: 'http://192.168.16.7:9000',
      changeOrigin: true
    }),
    createProxyMiddleware('/map', {
      target: 'http://192.168.16.7:8020',
      changeOrigin: true,
      pathRewrite: { '^/map': '' }
    })
  )
}
