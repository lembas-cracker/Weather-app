import React, { Component } from 'react'
import logo from './img/logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import countryCodes from './country-codes.json'
import Form from './Form.jsx'
import Weather from './Weather.jsx'
import LoadingBar from './LoadingBar.jsx'

function getCountryCode (country) {
  const countryInfo = countryCodes.find(c => caseEqual(c.name, country))
  if (countryInfo === undefined) {
    return false
  }
  const countryCode = countryInfo['alpha-2']
  return countryCode
}


let cityList = [];
fetch(process.env.PUBLIC_URL + "/city.list.json")
  .then(r => r.json())
  .then(list => cityList = list);

function getCityId (city, countryCode) {
  if (!city || !countryCode) {
    return false
  }
  const foundCity = cityList.find(
    c => caseEqual(c.name, city) && caseEqual(c.country, countryCode)
  )
  if (foundCity === undefined) {
    return false
  }
  return foundCity.id
}

function caseEqual(string1, string2) {
  return string1.toUpperCase() === string2.toUpperCase();
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
    console.log(cityId, countryCode, city, country);
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
          temperature: data.main.temp + "°",
          city: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          error: '',
          loading: false
        })
        return;
      }
    }

    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      error: "Location doesn't exist or not found."
    })
  }

  render() {
    return (
          <div className='container'>
           <div className='row justify-content-center no-gutters'>
           <div className="wrapper">
            <div className='main'>
              <div className='col-md-5 title-container'>
                <h1 className='app-title text-center'>Know your weather</h1>
                 <img src={logo} className='app-logo' alt='logo' />
              </div>
                <div className='col form-container'>
                  <Form getWeather={this.getWeather.bind(this)} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                  <div id="loading-bar"></div>
                </div>
              </div>
              </div>
            </div>
           </div>
    )
  }
}
