/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 16:55:02
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:09:10
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox13 from '@jiaminghi/data-view-react/es/borderBox13'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border13: FC<ITableProps> = ({ options }) => {
  return <BorderBox13 style={getStyles(options)} />
}
export default Border13