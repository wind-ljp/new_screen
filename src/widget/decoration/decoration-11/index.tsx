import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import Decoration11 from '@jiaminghi/data-view-react/es/decoration11'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const App: FC<ITableProps> = ({ options }) => {
  return (
    <Decoration11
      style={getStyles(options)}
      color={[options?.firstDecorationColor, options?.secondDecorationColor]}
    />
  )
}
export default App
