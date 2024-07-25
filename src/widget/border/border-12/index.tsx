/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 16:54:49
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:08:15
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox12 from '@jiaminghi/data-view-react/es/borderBox12'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border12: FC<ITableProps> = ({ options }) => {
  return <BorderBox12 style={getStyles(options)} />
}
export default Border12