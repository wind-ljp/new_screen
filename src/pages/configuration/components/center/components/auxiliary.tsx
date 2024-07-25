/*
 * @Author: liaojingping
 * @Date: 2022-11-25 12:44:41
 * @LastEditors: liaojingping
 * @LastEditTime: 2024-07-25 11:27:10
 * @FilePath: \bigscreen-develop\src\pages\configuration\components\center\components\auxiliary.tsx
 * @Description: 
 * Copyright (c) 2022 by liaojingping/华虹, All Rights Reserved. 
 */
import { IScreen } from '../../../../../store/actionType';
import {
  FC
} from 'react'

interface IAuxiliaryProps {
  screen: IScreen;
}

const Auxiliary: FC<IAuxiliaryProps> = ({
  screen
}) => {
  const arr = Array.from(new Array(screen.horizontalNumber * screen.verticalNumber).keys())
  return (
    <>
      {
        screen.showAuxiliary ? <div
          style={{
            padding: `${screen.interval}px 0  0 ${screen.interval}px`
          }}
          className='app-auxiliary__list'>
          {
            arr.map(item => (
              <div
                key={item}
                style={{
                  width: `calc(${100 / screen.horizontalNumber}% - ${screen.interval}px)`,
                  height: `calc(${100 / screen.verticalNumber}% - ${screen.interval}px)`,
                  margin: `0 ${screen.interval}px  ${screen.interval}px 0`,
                  borderColor: screen.auxiliaryBorderColor
                }}
                className="app-auxiliary__item"></div>
            ))
          }
        </div> : null
      }
    </>
  )
}

export default Auxiliary