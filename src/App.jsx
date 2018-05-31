import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import country_codes from './country-codes.json';
import Form from "./SearchBar.jsx";
import Weather from "./Weather.jsx";
import loadingBar from "./LoadingBar";

function getCountryCode(country) {
  const country_info = country_codes.find(c => c.name === country);
  if (country_info === undefined) {
    return false
  }
  const country_code = country_info['alpha-3'];
  return country_code
}

function getCityId(city, country_code) {
  return 0;
}

export class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const country_code = getCountryCode(country);
    const city_id = getCityId(city, country_code);
    if (city_id) {
      this.setState({
        loading: true
      });
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=403cb31deec233cc32ad204865bf0e56&units=metric`);
      const data = await api_call.json();
      if (data.main) {
        this.setState({
          temperature: data.main.temp,
          city: data.city,
          country: data.sys.country,
          description: data.weather[0].description,
          error: "",
          loading: false
        });
        return;
    }
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      error: "Location doesn't exist or not found."
    });
  }
}
  render() {
    if (this.state.loading) {
      (<loadingBar/>).style.display = "block";
    } else {
      ( <loadingBar/>).style.display = "none";
    }

    return (
    <div>
    <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col title-container">
             <img src={logo} className="App-logo" alt="logo" />
             <h1 className="App-title">Know your weather</h1>
            </div>
            <div className="col-7 form-container">
              <Form getWeather={this.getWeather} />
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
  </div>
);
}
};
