/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-02-05 16:19:17
 * @FilePath: \bigscreen\src\components\wrapper\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, ReactNode, HTMLAttributes } from 'react'
import { Spin, Empty } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import './index.scss'

interface IWrapperProps extends HTMLAttributes<HTMLDivElement> {
  loading: boolean
  error: boolean
  nodata: boolean
  children: ReactNode
}

const Wrapper: FC<IWrapperProps> = ({ loading, error, nodata, children }) => {
  return (
    <div className='app-wrapper'>
      {loading && (
        <div className='app-wrapper__loading'>
          <Spin />
        </div>
      )}
      {error && !loading && (
        <div className='app-wrapper__error'>
          <CloseCircleOutlined />
          <p
            style={{
              color: '#00000040',
              margin: '0'
            }}>
            加载失败
          </p>
        </div>
      )}
      {!loading && !error && nodata && (
        <div className='app-wrapper__nodata'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      {!loading && !error && !nodata && children}
    </div>
  )
}

export default Wrapper
