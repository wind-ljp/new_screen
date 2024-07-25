import { IAnyObject } from '../../../types/index'
import { ALL_STATE } from '../../../store/actionType'
import { Tabs } from 'antd'
import { FC } from 'react'
import { connect } from 'react-redux'
import AcEle from './components/AcEle'
import Ele from './components/Ele'
import KJ418 from './components/KJ418'
import Quake from './components/Quake'
import Water from './components/Water'
import Pressure from './components/pressure'
import './index.scss'
interface IFrameProps {
  userinfo: IAnyObject
}

const App: FC<IFrameProps> = ({ userinfo }) => {
  const items: any = [
    userinfo?.systemSubsystemList?.find((i: { id: number }) => i.id === 2)
      ? {
          label:
            userinfo?.systemSubsystemList?.find(
              (i: { id: number }) => i.id === 2
            )?.systemName || '水文监测',
          key: '1',
          children: <KJ418 userinfo={userinfo} />
        }
      : null,
    userinfo?.systemSubsystemList?.find((i: { id: number }) => i.id === 7)
      ? {
          label:
            userinfo?.systemSubsystemList?.find(
              (i: { id: number }) => i.id === 7
            )?.systemName ?? '微震监测',
          key: '2',
          children: <Quake userinfo={userinfo} />
        }
      : null,
    userinfo?.systemSubsystemList?.find((i: { id: number }) => i.id === 4)
      ? {
          label:
            userinfo?.systemSubsystemList?.find(
              (i: { id: number }) => i.id === 4
            )?.systemName ?? '水质水源',
          key: '3',
          children: <Water userinfo={userinfo} />
        }
      : null,
    userinfo?.systemSubsystemList?.find((i: { id: number }) => i.id === 3)
      ? {
          label:
            userinfo?.systemSubsystemList?.find(
              (i: { id: number }) => i.id === 3
            )?.systemName ?? '电法监测',
          key: '4',
          children: <Ele userinfo={userinfo} />
        }
      : null,
    userinfo?.systemSubsystemList?.find((i: { id: number }) => i.id === 15)
      ? {
          label:
            userinfo?.systemSubsystemList?.find(
              (i: { id: number }) => i.id === 15
            )?.systemName ?? '随掘电法',
          key: '5',
          children: <AcEle userinfo={userinfo} />
        }
      : null,
      userinfo?.systemSubsystemList?.find((i: { id: number }) => i.id === 13)
      ? {
          label:
            userinfo?.systemSubsystemList?.find(
              (i: { id: number }) => i.id === 13
            )?.systemName ?? '矿压',
          key: '6',
          children: <Pressure userinfo={userinfo} />
        }
      : null
  ]

  const onChange = (key: string) => {}
  return (
    <div className='container'>
      <Tabs defaultActiveKey='1' onChange={onChange} items={items} />
    </div>
  )
}

const mapStateToProps = (state: ALL_STATE) => ({
  userinfo: state.userinfo
})

export default connect(mapStateToProps, null)(App)

// export default App
