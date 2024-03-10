import React from 'react'

export default function Preloader(
  {h,w}:any
) {
  return (
    <div className={`flex justify-center items-center ${h} ${w} loader`}>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__bar"></div>
  <div className="loader__ball"></div>
</div>
  )
}
