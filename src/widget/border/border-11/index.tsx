/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:56
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:07:52
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox11 from '@jiaminghi/data-view-react/es/borderBox11'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border11: FC<ITableProps> = ({ options }) => {
  return <BorderBox11 style={getStyles(options)} />
}
export default Border11