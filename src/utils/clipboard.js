/*
 * @Author: liaojingping
 * @Date: 2023-02-23 17:14:28
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-02-23 17:22:28
 * @FilePath: \BigScreenWebFE\src\utils\clipboard.js
 * @Description: 复制文本到剪贴板
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved. 
 */
import Clipboard from 'clipboard'
import { message } from 'antd'

function clipboardSuccess(text) {
  message.success(`复制成功`)
}

function clipboardError(text) {
  message.error(`复制失败`)
}

/**
 * @description 复制数据
 * @param text
 * @param event
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(text)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(text)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

