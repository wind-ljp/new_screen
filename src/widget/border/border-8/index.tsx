/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:51
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:12:22
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox8 from '@jiaminghi/data-view-react/es/borderBox8'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border8: FC<ITableProps> = ({ options }) => {
  return <BorderBox8 style={getStyles(options)} />
}
export default Border8