/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:52
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:12:45
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

const Border8R: FC<ITableProps> = ({ options }) => {
  return <BorderBox8 style={getStyles(options)} reverse="{true}" />
}
export default Border8R