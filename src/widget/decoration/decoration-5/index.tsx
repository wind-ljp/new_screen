import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import Decoration5 from '@jiaminghi/data-view-react/es/decoration5'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const App: FC<ITableProps> = ({ options }) => {
  return (
    <Decoration5
      style={getStyles(options)}
      color={[options?.firstDecorationColor, options?.secondDecorationColor]}
    />
  )
}
export default App
