/*
 * @Description: 全屏及组件显示状态控制
 * @Author: liaojingping
 * @Date: 2024-02-06 13:35:16
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:37:53
 */
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import fullPng from '../../assets/image/three/full.png'
import togglePng from '../../assets/image/three/toggle.png'

const App = (props: {
  toFullScreen: () => void
  toggleChart: (argus: string) => void
  dimension?: string
}) => {
  let items
  if (props?.dimension === '2D') {
    items = [
      {
        key: '1',
        label: '地图'
      },
      {
        key: '2',
        label: '地图 + 统计面板'
      }
    ]
  } else if (props?.dimension === '3D') {
    items = [
      {
        key: '1',
        label: '模型'
      },
      {
        key: '2',
        label: '模型 + 统计面板'
      },
      {
        key: '3',
        label: '模型 + 资源面板'
      }
    ]
  } else {
    items = [
      {
        key: '1',
        label: '关闭统计面板'
      },
      {
        key: '2',
        label: '显示统计面板'
      }
    ]
  }
  const onClick: MenuProps['onClick'] = (val) => {
    val.domEvent.nativeEvent.stopImmediatePropagation()
    props.toggleChart(val.key)
  }
  return (
    <>
      <div
        className='tool'
        onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <img
          title='全屏/按ESC键退出全屏'
          src={fullPng}
          alt='full'
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation()
            props.toFullScreen()
          }}
        />
        <Dropdown
          getPopupContainer={() =>
            document.getElementById('full-screen-container') ?? document.body
          }
          menu={{
            items: items,
            selectable: true,
            onClick: onClick
          }}>
          <img title='切换' src={togglePng} alt='toggle' />
        </Dropdown>
      </div>
    </>
  )
}

export default App
