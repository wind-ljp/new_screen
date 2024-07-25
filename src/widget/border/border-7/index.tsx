/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:49
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:12:09
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox7 from '@jiaminghi/data-view-react/es/borderBox7'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border7: FC<ITableProps> = ({ options }) => {
  return <BorderBox7 style={getStyles(options)} />
}
export default Border7