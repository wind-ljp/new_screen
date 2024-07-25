/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:39
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:09:27
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox2 from '@jiaminghi/data-view-react/es/borderBox2'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border2: FC<ITableProps> = ({ options }) => {
  return <BorderBox2 style={getStyles(options)} />
}
export default Border2