import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import Decoration2 from '@jiaminghi/data-view-react/es/decoration2'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const App: FC<ITableProps> = ({ options }) => {
  return (
    <Decoration2
      style={getStyles(options)}
      color={[options?.firstDecorationColor, options?.secondDecorationColor]}
    />
  )
}
export default App
