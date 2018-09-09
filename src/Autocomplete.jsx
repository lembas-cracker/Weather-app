import React from 'react'

export default class Autocomplete extends React.Component {
  handleChange(event) {
    
  }
  render() {
    return <input 
      type='text' 
      className='col-5' 
      name={this.props.name} 
      placeholder={this.props.placeholder}
      
    />
  }
}


