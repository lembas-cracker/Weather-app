import React from 'react'
import Autocomplete from './Autocomplete.jsx'

const Form = props => (
  <form onSubmit={props.getWeather} className='weather-form' autoComplete="off">
    <Autocomplete name='country' placeholder='Country...' possibleValues={[]} />
    <Autocomplete name='city' placeholder='City...' possibleValues={[]} />
    <button className="getButton">Get Weather</button>
  </form>
)

export default Form
