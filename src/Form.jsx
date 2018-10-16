import React from 'react'
import Autocomplete from './Autocomplete.jsx'
import countryCodes from './country-codes.json'
import { getCountryCode } from './location-functions.js'

const countries = countryCodes.map(c => {
  return c.name
})

export default class Form extends React.Component {
  state = {
    cities: []
  }
  handleFocus = () => {
    (async () => {
      const countryValue = this.refs.countryInput.state.value;
      const countryCode = getCountryCode(countryValue);
      if(countryCode === false) {
        this.setState({
          cities: []
        })
        return undefined;
      }
      const cityCall = await fetch(process.env.PUBLIC_URL + "/cities/" + countryCode.toLowerCase() + ".json");
      const cities = await cityCall.json();
      this.setState({
        cities: cities
      })
    })()
  }

  render() {
    return (
      <form onSubmit={this.props.getWeather} className='weather-form' autoComplete="off">
      <div className='row'>
        <div className='col-sm-6'>
          <Autocomplete ref="countryInput" name='country' placeholder='Country...' possibleValues={countries} />
      </div>
        <div className='col-sm-6'>
          <Autocomplete name='city' placeholder='City...' possibleValues={this.state.cities} onFocus={this.handleFocus} />
        </div>
        </div>
        <button className="getButton">Get Weather</button>
      </form>
    );
  }
}
