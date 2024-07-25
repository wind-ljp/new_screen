/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:41
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:09:45
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox3 from '@jiaminghi/data-view-react/es/borderBox3'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border3: FC<ITableProps> = ({ options }) => {
  return <BorderBox3 style={getStyles(options)} />
}
export default Border3