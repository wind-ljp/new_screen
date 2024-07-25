/*
 * @Description: 页面描述
 * @Author: liaojp
 * @Date: 2022-09-04 16:50:14
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 10:53:58
 * @FilePath: \配置大屏\src\pages\login\index.tsx
 * Copyright (c) 2022 by liaojp, All Rights Reserved.
 */
import { FC, useCallback, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ALL_STATE } from '../../store/actionType'
import './index.scss'
import { userinfo } from '../../store/actions/userinfo'
import { loginSystem, getAllDictionary } from '../../service/user'
import { IAnyObject } from '../../types/index'
import session from '../../utils/session-storage'

interface ILoginProps {
  saveUserInfo: (data: IAnyObject) => void
  userinfo: IAnyObject
}

const Login: FC<ILoginProps> = ({ saveUserInfo, userinfo }) => {
  let history = useHistory()
  const [loginForm] = Form.useForm()

  useEffect(() => {
    document.title = window.smallTitle
  }, [])

  const jumpHome = useCallback(() => {
    session.setItem('hostname', window.location.hostname)
    history.replace('/frame/home')
    getAllDictionary().then((res: any) => {
      if (res.code === 200) {
        localStorage.setItem('dictList', JSON.stringify(res.data) || JSON.stringify([]))
      }
    })
  }, [history])

  const onFinish = (values: any) => {
    loginSystem(values).then((res) => {
      if (res.data) {
        saveUserInfo(res.data)
        session.setItem('token', res.data.token)
        session.setItem('defaultUnitId', res.data.systemUnitList[0].id)
        jumpHome()
      } else {
        message.warning(res.msg)
      }
    })
  }

  useEffect(() => {
    if (session.getItem('token')) {
      jumpHome()
    }
  }, [jumpHome])

  return (
    <div className='app-login'>
      <div className='app-login__form'>
        <div className='header'>
          <div className='logo'></div>
          <h2 className='title'>{window.sysTitle}</h2>
        </div>
        <div className='body'>
          <Form
            name='basic-login'
            form={loginForm}
            onFinish={onFinish}
            autoComplete='off'>
            <Form.Item
              name='username'
              rules={[{ required: true, message: '请输入用户名！' }]}>
              <Input
                id='login-input-xxx'
                size='large'
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='账户'
                bordered={false}
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: '请输入密码！' }]}>
              <Input.Password
                id='login-input-xxx-2'
                size='large'
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='密码'
                bordered={false}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' block size='large'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ALL_STATE) => ({
  counter: state.counter,
  userinfo: state.userinfo
})

const mapDispatchToProps = {
  saveUserInfo: userinfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
