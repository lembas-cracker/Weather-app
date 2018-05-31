import React from 'react'

const Form = props => (
  <form onSubmit={props.getWeather}>
    <input
      type='text'
      name='country'
      placeholder='Country...'
      className='col-4'
    />
    <input type='text' name='city' placeholder='City...' className='col-4' />
    <button>Get Weather</button>
  </form>
)

export default Form
