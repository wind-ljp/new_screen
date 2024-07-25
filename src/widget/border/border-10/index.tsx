/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:54
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:07:36
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox10 from '@jiaminghi/data-view-react/es/borderBox10'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border10: FC<ITableProps> = ({ options }) => {
  return <BorderBox10 style={getStyles(options)} />
}
export default Border10