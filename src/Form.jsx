import React from 'react'


const Form = props => (
  <form onSubmit={props.getWeather} className='weather-form'>
    <input
      type='text'
      name='country'
      placeholder='Country...'
      className='col-md-5 col-5 string1'
    />
    <input type='text' name='city' placeholder='City...' className='col-md-5 col-5 string2' />
    <button className="getButton">Get Weather</button>
  </form>
)

export default Form
