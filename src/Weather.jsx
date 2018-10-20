import React from 'react'
import spriteCoordinates from './cloud-sprites'

export function getSpriteStyle(condition) {
  const x = spriteCoordinates[condition].x
  const y = spriteCoordinates[condition].y
  return {
    backgroundPosition: "top -"+ y*60 + "px left -" + x*60 + "px"
  }
}

const Weather = props => (
  <div className='weather__info'>
    {props.city &&
      props.country &&
      <p className='weather__key'>
        Location:
        <span className='weather__value'> {props.city}, {props.country}</span>
      </p>}
    {props.temperature &&
      <p className='weather__key'>
        Temperature:
        <span className='weather__value'> {Math.round(props.temperature)}° </span>
      </p>}
    {props.description &&
      <div className='weather__key'>
        Conditions:
        <div className="d-inline-block weather__condition-container">
          <div className='weather__icon' style={getSpriteStyle(props.description)}></div>
          <span className='weather__condition-value'>{props.description}</span>
        </div>
      </div>}
    {props.error && <p className='weather__error'>{props.error}</p>}
  </div>
)


export default Weather
