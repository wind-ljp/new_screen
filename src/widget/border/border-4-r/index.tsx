/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:45:43
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:10:19
 */
/*
 * @Description: 
 * @Author: liaojingping
 * @Date: 2023-10-12 15:41:16
 * @LastEditors: liaojingping
 * @LastEditTime: 2023-10-12 15:45:28
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

const Border4R: FC<ITableProps> = ({ options }) => {
  return <BorderBox4 style={getStyles(options)} reverse="{true}" />
}
export default Border4R