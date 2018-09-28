import React from 'react'
import Autocomplete from './Autocomplete.jsx'
import countryCodes from './country-codes.json'

const countries = countryCodes.map(c => {
  return c.name
})

const Form = props => (
  <form onSubmit={props.getWeather} className='weather-form' autoComplete="off">
   <div className='row'>
    <div className='col-6'>
      <Autocomplete name='country' placeholder='Country...' possibleValues={countries} />
   </div>
    <div className='col-6'>
      <Autocomplete name='city' placeholder='City...' possibleValues={[]}/>
    </div>
   </div>
    <button className="getButton">Get Weather</button>
  </form>
)

export default Form
