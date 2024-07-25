import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import Decoration4 from '@jiaminghi/data-view-react/es/decoration4'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const App: FC<ITableProps> = ({ options }) => {
  return (
    <Decoration4
      style={getStyles(options)}
      reverse={true}
      color={[options?.firstDecorationColor, options?.secondDecorationColor]}
    />
  )
}
export default App
