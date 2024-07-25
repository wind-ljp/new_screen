/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2024-02-06 14:22:39
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:38:23
 */
import './index.scss'
import { getStyles } from '../../../utils/tools'
import fullPng from '../../../assets/image/three/full.png'

const Screen = (props: any) => {
  return (
    <img
      className='Other'
      title='全屏/按ESC键退出全屏'
      src={fullPng}
      style={Object.assign(getStyles(props.options), { cursor: 'pointer' })}
      alt='screen'
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation()
        props.toFullScreen()
      }}
    />
  )
}
export default Screen
