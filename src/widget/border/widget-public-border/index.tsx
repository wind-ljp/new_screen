/*
 * @Description: 通用svg组件
 * @Author: liaojingping
 * @Date: 2023-12-27 16:41:11
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:13:16
 */
import './index.scss'
import { IAnyObject } from '../../../types'
import { FC } from 'react'
import { getStyles } from '../../../utils/tools'
import { ReactSVG } from 'react-svg'
import { css } from 'glamor'
interface ITableProps {
  data: IAnyObject
  field: string
  options: any
}

const BorderPublic: FC<ITableProps> = ({ options }) => {
  const styles = css({
    ' svg': {
      ...getStyles(options)
    }
  })
  return <ReactSVG src={options?.svgAddress || ''} {...styles} />
}
export default BorderPublic
