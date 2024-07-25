/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-07 20:16:24
 * @LastEditors: liaojingping
 * @LastEditTime: 2022-12-08 15:15:20
 * @FilePath: \bigscreen-develop\src\components\create-portal\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

interface CreatePortalProps {
  children: ReactNode
}

const CreatePortal: FC<CreatePortalProps> = ({ children }) => {
  let el = useRef(document.createElement('div'))
  useEffect(() => {
    document.body.appendChild(el.current)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.body.removeChild(el.current)
    }
  }, [el])
  return ReactDOM.createPortal(children, el.current)
}

export default CreatePortal
