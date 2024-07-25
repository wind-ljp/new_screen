/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:39:30
 * @FilePath: \bigscreen-develop\src\pages\configuration\components\add-or-edit-page\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, useEffect, SetStateAction, Dispatch } from 'react'
import { Button, Form, Input, message } from 'antd'
import { IPage, IWidget } from '../../../../store/actionType'
import { guid } from '../../../../utils/tools'
import { IAnyObject } from '../../../../types';

interface IModalState {
  visible: boolean;
}

interface IAddOrEditPageProps {
  setModal: Dispatch<SetStateAction<IModalState>>;
  addLargeScreenPage: (data: IPage, callback?: () => void) => void
  modifyLargeScreenPage: (id: string, data: IPage, callback?: () => void) => void
  details: {
    name: string,
    id: string,
    widgets: IWidget
  }
}

const AddOrEditPage: FC<IAddOrEditPageProps> = ({
  setModal,
  addLargeScreenPage,
  modifyLargeScreenPage,
  details
}) => {
  const [form] = Form.useForm()
  // 编辑时回填表单数据
  useEffect(() => {
    if (details.name) {
      form.setFieldsValue({
        name: details.name
      })
    }
  }, [details.name, form])

  // 成功回调函数
  const successHandler = (msg: string) => {
    message.success(msg)
    setModal(prevState => ({ ...prevState, visible: false }));
  }
  // 保存
  const onFinish = (values: any) => {
    const params = {
      ...values,
      id: details.id || guid(),
      widgets: details.widgets || []
    }
    // 编辑
    if (details.id) {
      modifyLargeScreenPage(details.id, params, () => {
        successHandler('编辑成功')
      })
    } else {
      // 新增
      addLargeScreenPage(params, () => {
        successHandler('新增成功')
      })
    }
  }

  return (
    <Form name='basic' onFinish={onFinish} autoComplete='off' form={form}>
      <Form.Item
        name='name'
        rules={[{ required: true, message: '此项为必填项！' }]}>
        <Input
          placeholder='请输入页面名称'
          ref={(input) => {
            setTimeout(() => {
              input?.focus();
            }, 0);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' block htmlType='submit'>
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddOrEditPage
