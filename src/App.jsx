import React, { Component } from 'react'
import logo from './img/logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import countryCodes from './country-codes.json'
import Form from './Form'
import Weather from './Weather.jsx'
import LoadingBar from './LoadingBar'
import cityList from './city.list.json'

function getCountryCode (country) {
  const countryInfo = countryCodes.find(c => c.name === country)
  if (countryInfo === undefined) {
    return false
  }
  const countryCode = countryInfo['alpha-3']
  return countryCode
}

// {
//   "id": 707860,
//   "name": "Hurzuf",
//   "country": "UA",
//   "coord": {
//     "lon": 34.283333,
//     "lat": 44.549999
//   }
// },

function getCityId (city, countryCode) {
  const foundCity = cityList.find(
    c => c.name === city && c.country === countryCode
  )
  if (foundCity === undefined) {
    return false
  }
  return foundCity.id
}

export class App extends Component {
  constructor () {
    super()
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      error: undefined
    }
  }

  async getWeather (e) {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const countryCode = getCountryCode(country)
    const cityId = getCityId(city, countryCode)
    if (cityId) {
      this.setState({
        loading: true
      })
      const apiCall = await window.fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=403cb31deec233cc32ad204865bf0e56&units=metric`
      )
      const data = await apiCall.json()
      if (data.main) {
        this.setState({
          temperature: data.main.temp,
          city: data.city,
          country: data.sys.country,
          description: data.weather[0].description,
          error: '',
          loading: false
        })
        return
      }
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        error: "Location doesn't exist or not found."
      })
    }
  }
  render () {
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col title-container'>
                  <img src={logo} className='App-logo' alt='logo' />
                  <h1 className='App-title'>Know your weather</h1>
                </div>
                <div className='col-7 form-container'>
                  <Form getWeather={this.getWeather.bind(this)} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                  {/* <LoadingBar /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
