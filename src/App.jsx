import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from './Form.jsx'
import Weather from './Weather.jsx'
import './Autocomplete.jsx'
import PageContainer from './PageContainer.jsx'
import { getCountryCode } from './location-functions.js'


export class App extends Component {
  constructor () {
    super()
    this.state = {
      loading: false
    }
  }

  async getWeather (e) {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const countryCode = getCountryCode(country)
    if (city && countryCode) {
      this.setState({
        loading: true
      })
      const apiCall = await window.fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=403cb31deec233cc32ad204865bf0e56&units=metric`
      )
      const data = await apiCall.json()
      if (data.main) {
        this.setState({
          temperature: data.main.temp,
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
      <PageContainer>
        <Form getWeather={this.getWeather.bind(this)} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          description={this.state.description}
          error={this.state.error}
        />
      </PageContainer>
    )
  }
}
