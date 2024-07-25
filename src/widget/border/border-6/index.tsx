/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:48
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:11:53
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import BorderBox6 from '@jiaminghi/data-view-react/es/borderBox6'
import { getStyles } from '../../../utils/tools'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const Border6: FC<ITableProps> = ({ options }) => {
  return <BorderBox6 style={getStyles(options)} />
}
export default Border6