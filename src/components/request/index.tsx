/*
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:26:58
 * @FilePath: \bigscreen-develop\src\components\request\index.tsx
 * @Description: Request组件请求
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import React, { FC } from 'react'
import Wrapper from '../../components/wrapper'
import { useRequest } from 'ahooks'
import axios from 'axios'

interface IDataResponse {
  code: string
  msg: string
  data: {
    [key: string]: any
  }
}

interface IResult extends IDataResponse {
  success: boolean
}

interface IRequestProps {
  // 是否需要占位
  isPlaceholder: Boolean
  // 类型
  method: 'get' | 'post'
  // 接口地址
  url: string
  // 接口参数
  params: string
  render: (data: any, success: boolean, setP?: React.Dispatch<any>) => any
}

const Request: FC<IRequestProps> = ({
  method,
  url,
  params,
  isPlaceholder,
  render
}) => {
  const axiosBody =
    method === 'get'
      ? {
          url,
          method,
          params: JSON.parse(params)
        }
      : {
          url,
          method,
          data: JSON.parse(params)
        }

  // 获取数据
  const { data, loading, error } = useRequest(
    async () => {
      console.log(url, process.env.REACT_APP_ENV === 'production', 'url')
      return await new Promise(
        (resolve: (data: IResult) => void, reject: (data: any) => void) => {
          axios(axiosBody)
            .then((res: any) => {
              resolve(res)
            })
            .catch((res) => {
              reject(res)
            })
        }
      )
    },
    {
      refreshDeps: [params, url],
      ready: Boolean(url)
    }
  )

  return (
    <>
      {isPlaceholder ? (
        <Wrapper loading={loading} error={Boolean(error)} nodata={false}>
          {render(url ? data : null, url ? !error : true)}
        </Wrapper>
      ) : (
        render(url ? data : null, url ? !error : true)
      )}
    </>
  )
}
export default Request
