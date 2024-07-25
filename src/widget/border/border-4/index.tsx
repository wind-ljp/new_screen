/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:42
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:10:04
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox4 from '@jiaminghi/data-view-react/es/borderBox4'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border4: FC<ITableProps> = ({ options }) => {
  return <BorderBox4 style={getStyles(options)} />
}
export default Border4