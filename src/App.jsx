import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Autocomplete.jsx";
import Form from "./Form.jsx";
import Weather from "./Weather.jsx";
import PageContainer from "./PageContainer.jsx";
import ForecastContainer from "./ForecastContainer.jsx";
import { getCountryCode } from "./location-functions.js";
import arrowdown from "./arrowdown.svg";
import ContactInfo from "./ContactInfo.jsx";

export class App extends Component {
  state = {
    loading: false,
    isMetricActive: true,
    arrowIcon: false,
    forecastIsHidden: true
  };

  toggleActive = () => {
    this.setState({
      isMetricActive: !this.state.isMetricActive
    });
  };

  toggleForecastHidden = () => {
    this.setState({
      forecastIsHidden: !this.state.forecastIsHidden
    });
  };

  async getWeather(e) {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const countryCode = getCountryCode(country);
    if (city && countryCode) {
      this.setState({
        loading: true
      });
      const apiCall = await window.fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=403cb31deec233cc32ad204865bf0e56&units=metric`
      );
      const data = await apiCall.json();
      if (data.main) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          countryCode: data.sys.country,
          description: data.weather[0].description,
          error: "",
          loading: false,
          arrowIcon: true
        });
        return;
      }
    }

    this.setState({
      temperature: undefined,
      city: undefined,
      countryCode: undefined,
      description: undefined,
      error: "Location doesn't exist or not found.",
      arrowIcon: false
    });
  }

  render() {
    return (
      <div>
        <PageContainer>
          <Form getWeather={this.getWeather.bind(this)} />
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            countryCode={this.state.countryCode}
            description={this.state.description}
            error={this.state.error}
            isMetricActive={this.state.isMetricActive}
            toggleActive={this.toggleActive}
          />
          {this.state.arrowIcon ? (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-end">
              <span className="fiveDayForecast">5-day weather forecast</span>
              <img
                src={arrowdown}
                alt=""
                className="arrow-down"
                onClick={this.toggleForecastHidden.bind(this)}
              />
            </div>
          ) : null}
        </PageContainer>
        {!this.state.forecastIsHidden ? (
          <ForecastContainer
            city={this.state.city}
            countryCode={this.state.countryCode}
            isMetricActive={this.state.isMetricActive}
          />
        ) : null}
        <ContactInfo />
      </div>
    );
  }
}
