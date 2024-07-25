/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:46
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:10:53
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox5 from '@jiaminghi/data-view-react/es/borderBox5'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border5R: FC<ITableProps> = ({ options }) => {
  return <BorderBox5 style={getStyles(options)} reverse="{true}" />
}
export default Border5R