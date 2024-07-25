/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  HTMLAttributes,
  useEffect,
  useState
} from 'react'
import { IAnyObject } from '../../../types'
import DigitalScrollItem from './components/item'
import './index.scss'

import { post, get } from '../../../service/fetch'
import { useLocation } from 'react-router-dom'

interface IDigitalScrollProps {
  // 数据，模拟跟真实数据都走这里
  data: IAnyObject,
  // 字段名
  field: string;
  options: any;
}

const DigitalScroll: FC<IDigitalScrollProps> = ({
  data = {},
  field = 'data',
  options
}) => {
  const { dataValue } = options
  const [newData, setNewData] = useState(data)
  const [arr, setArr] = useState<any[]>([0])
  const location = useLocation()
  useEffect(() => {
    let intervalId: any

    const fetchData = async () => {
      try {
        let response: any

        if (dataValue.method === 'get') {
          response = await get({
            url: dataValue.url,
            loading: true,
            params: dataValue.params
          })
        } else if (dataValue.method === 'post') {
          response = await post({
            url: dataValue.url,
            loading: true,
            data: dataValue.params
          })
        }

        setNewData(response)
      } catch (error) {
        console.error(error)
      }
    }

    if (
      location.pathname === '/frame/preview' &&
      dataValue.autoTime &&
      dataValue.dataType === 'dynamic'
    ) {
      intervalId = setInterval(fetchData, dataValue.autoTime)
    } else {
      setNewData(data)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    location.pathname,
    dataValue,
    (prevDataValue: any) =>
      JSON.stringify(prevDataValue) === JSON.stringify(dataValue)
  ])
  useEffect(() => {
    if (newData && newData[field] && !isNaN(newData[field])) {
      setArr(String(newData[field]).split(''))
    }
  }, [newData, field])
  return (
    <div
      style={{
        width: options.width,
        height: options.height
      }}
      className="app-element app-element__digitalscroll">
      {
        arr.map((item, idx) => (
          <DigitalScrollItem
            key={idx}
            options={options}
            value={item}></DigitalScrollItem>
        ))
      }

    </div>
  )
}
export default DigitalScroll 