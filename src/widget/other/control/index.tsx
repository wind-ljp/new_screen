/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2024-02-06 14:22:33
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:41:27
 */
import './index.scss'
import { getStyles } from '../../../utils/tools'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import togglePng from '../../../assets/image/three/toggle.png'

const items = [
  {
    key: '1',
    label: '关闭统计面板'
  },
  {
    key: '2',
    label: '显示统计面板'
  }
]

const Control = (props: any) => {
  const onClick: MenuProps['onClick'] = (val) => {
    val.domEvent.nativeEvent.stopImmediatePropagation()
    props.toggleChart(val.key)
  }
  return (
    <Dropdown
      className='Other'
      getPopupContainer={() =>
        document.getElementById('full-screen-container') ?? document.body
      }
      menu={{
        items: items,
        selectable: true,
        onClick: onClick
      }}>
      <img
        style={Object.assign(getStyles(props.options), { cursor: 'pointer' })}
        title='切换'
        src={togglePng}
        alt='toggle'
      />
    </Dropdown>
  )
}
export default Control
