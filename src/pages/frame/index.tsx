import { FC, Key, useEffect, useMemo, useState } from 'react'
import { ALL_STATE, IRouter, IMenu, IBreadCrumbsItem } from '../../store/actionType'
import { connect } from 'react-redux'
import { getMenu } from '../../store/actions/authorization'
import { LogoutOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useHistory, RouteProps } from 'react-router-dom'
import Routers from './components/routers'
import BreadCrumbs from './components/bread-crumbs'
import CustomMenu from './components/menu'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import session from '../../utils/session-storage'
import { IAnyObject } from '../../types/index'
import { Select, Button, message } from 'antd'
import { getList } from '../../service/screen'
import localForage from 'localforage';

import './index.scss'

interface IFrameProps extends RouteProps {
  routers: IRouter[]
  getMenu: (menu?: IMenu[]) => void
  menu: IMenu[]
  userinfo: IAnyObject
  breadCrumbs: IBreadCrumbsItem[]
}

const Frame: FC<IFrameProps> = ({
  routers,
  getMenu,
  menu,
  breadCrumbs,
  userinfo,
  ...rest
}) => {
  const history = useHistory()
  // 展开收起菜单
  const [collapsed, setCollapsed] = useState(() => {
    return Boolean(session.getItem('collapsed'))
  })
  // 判断全屏的路由
  const isFullscreen = useMemo(() => {
    const map = ['/frame/configuration', '/frame/preview']
    if (map.includes(rest.location?.pathname as string)) {
      return true
    }
    return false
  }, [rest.location?.pathname])

  useEffect(() => {
    if (!menu.length) {
      getMenu()
    }
  }, [getMenu, menu])

  useEffect(() => {
    session.setItem('collapsed', collapsed)
  }, [collapsed])

  const clearAllData = async () => {
    try {
      await localForage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  // 退出登录
  const loginOut = () => {
    Modal.confirm({
      title: '确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        window.sessionStorage.clear()
        clearAllData()
        history.replace('/login')
      }
    })
  }

  const unitChange = (value: number) => {
    session.setItem('defaultUnitId', value)
    window.location.reload()
  }

  return (
    <div
      className='app-screen-layout'
      style={{
        paddingTop: isFullscreen ? 0 : 58
      }}>
      {!isFullscreen ? (
        <>
          <header className='app-screen-layout__header'>
            <div className={`left ${collapsed ? 'is-close' : ''}`}>
              {/* <div className='app-icon logo'>&#xe605;</div> */}
              <div className='sitename'>{window.menuTitle}</div>
            </div>
            <div className='center'>
              <Select
                style={{ width: '150px', marginLeft: '10px' }}
                defaultValue={
                  session.getItem('defaultUnitId') ??
                  userinfo?.systemUnitList[0].id
                }
                onChange={unitChange}>
                {userinfo?.systemUnitList.map(
                  (i: { id: Key | null | undefined; unitName: string }) => (
                    <Select.Option key={i.id} value={i.id}>
                      {i.unitName}
                    </Select.Option>
                  )
                )}
              </Select>
            </div>
            <div className='right'>
              <div className='operation'>
                <span className='username'>{userinfo.username}</span>
                <LogoutOutlined
                  className='exit'
                  style={{ fontSize: 20 }}
                  onClick={loginOut}
                />
              </div>
            </div>
          </header>
          <section
            className={`app-screen-layout__body ${
              collapsed ? 'is-close' : ''
            }`}>
            <div className='app-screen-layout__left'>
              <CustomMenu
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                menu={menu}
                routers={routers}
                currPageTabKey={rest.location?.pathname as string}
              />
            </div>
            <div className='app-screen-layout__right'>
              {/* <BreadCrumbs
                currPageTabKey={rest.location?.pathname as string}
                breadCrumbs={breadCrumbs}
              /> */}
              <div className='app-screen-layout__main'>
                <Routers routers={routers} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <Routers routers={routers} />
      )}
    </div>
  )
}

const mapStateToProps = (state: ALL_STATE) => ({
  routers: state.authorization.routers,
  menu: state.authorization.menu,
  breadCrumbs: state.authorization.breadCrumbs,
  userinfo: state.userinfo
})

const mapDispatchToProps = {
  getMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)
