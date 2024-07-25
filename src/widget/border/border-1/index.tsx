/*
 * @Description:
 * @Author: liaojingping
 * @Date: 2023-10-12 15:41:16
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:07:16
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox1 from '@jiaminghi/data-view-react/es/borderBox1'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border1: FC<ITableProps> = ({ options }) => {
  return <BorderBox1 style={getStyles(options)} />
}
export default Border1
