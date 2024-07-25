// import { FC } from 'react'
import './index.scss'

// interface IRulerProps { }

const Ruler = (props: { cale: number }) => {

  const arr = Array.from(new Array(100).keys())

  return (
    <div
      className="app-screen-disign__ruler">
      <div className='app-screen-disign__ruler--hwrapper'>
        <div
          className="app-screen-disign__ruler--h">
          <span className='ruler-h-50'>
            <b>-50</b>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          {
            arr.map((item: any, index: number) => props.cale ? (
              <span className='ruler-h-50' key={index}>
                <b>{Math.ceil(index * 50 / props.cale)}</b>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            ) : null)
          }
        </div>
      </div>
      <div className='app-screen-disign__ruler--vwrapper'>
        <div
          className="app-screen-disign__ruler--v">
          <span className='ruler-h-50'>
            <b>-50</b>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          {
            arr.map((item: any, index: number) => props.cale ? (
              <span className='ruler-h-50' key={index}>
                <b>{Math.ceil(index * 50 / props.cale)}</b>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            ) : null)
          }
        </div>
      </div>
    </div>
  )
}

export default Ruler