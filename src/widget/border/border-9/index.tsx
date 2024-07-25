/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:53
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:12:57
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox9 from '@jiaminghi/data-view-react/es/borderBox9'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border9: FC<ITableProps> = ({ options }) => {
  return <BorderBox9 style={getStyles(options)} />
}
export default Border9