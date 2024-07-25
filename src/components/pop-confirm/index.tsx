/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:38:23
 * @FilePath: \BigScreenWebFE\src\components\pop-confirm\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, ReactNode } from 'react'
import { message, Popconfirm } from 'antd'
import { IAnyObject } from '../../types'
import { delPost } from '../../service/screen'
import { getFormData } from '../../utils/tools'

interface IPopConfirmProps {
  // 文本
  text?: string
  // 刷新表格
  reload?: () => void
  // 其他参数
  params?: IAnyObject
  // 回调方法
  callback?: Function
  children?: ReactNode
}

const PopConfirm: FC<IPopConfirmProps> = ({
  text,
  reload,
  params,
  callback,
  children
}) => {
  const onConfirm = () => {
    delPost(getFormData(params)).then(() => {
      message.success(`${text}成功`)
      reload && reload()
      callback && callback()
    })
  }
  return (
    <Popconfirm
      key='popconfirm'
      title={`确认${text}吗?`}
      okText='是'
      cancelText='否'
      onConfirm={onConfirm}>
      <span className='link'>{children ? children : text}</span>
    </Popconfirm>
  )
}

export default PopConfirm
