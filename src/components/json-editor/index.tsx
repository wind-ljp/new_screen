/*
 * @Author: liaojingping
 * @Date: 2023-02-14 11:05:42
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:37:54
 * @FilePath: \配置大屏\src\components\json-editor\index.tsx
 * @Description: JSON 组件
 * Copyright (c) 2023 by liaojingping/华虹, All Rights Reserved.
 */
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { IAnyObject } from '../../types'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import './index.scss'
import { useUpdateEffect } from 'ahooks'

interface IJsonEditorProps {
  value: IAnyObject
  onChange?: (json?: IAnyObject) => void
  options?: JSONEditorOptions
}

const JsonEditor: FC<IJsonEditorProps> = ({
  value,
  onChange,
  options = {}
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorObj = useRef<JSONEditor | null>(null)
  const [isChanging, setChanging] = useState<boolean>(true)

  // 初始化JOSN编辑器
  const initEditor = useCallback(() => {
    if (!editorObj.current) {
      const totalOptions: JSONEditorOptions = {
        mode: 'code',
        onChange: () => {
          setChanging(false)
          onChange?.(editorObj.current?.get() as IAnyObject)
        },
        ...options
      }
      editorObj.current = new JSONEditor(
        editorRef.current as HTMLElement,
        totalOptions,
        value
      )
    }
  }, [onChange, options, value])

  useEffect(() => {
    initEditor()
  }, [initEditor])

  useUpdateEffect(() => {
    if (isChanging) {
      editorObj.current?.set(value)
    }
    return () => {
      setChanging(true)
    }
  }, [JSON.stringify(value), options.name])

  useEffect(() => {
    return () => {
      // 销毁
      if (editorObj.current) {
        editorObj.current.destroy()
      }
    }
  }, [editorObj])

  return <div ref={editorRef} className='app-json-editor'></div>
}

export default JsonEditor
