import React from "react";
import { getSpriteStyle } from "./Weather.jsx";
import { formatTemperature } from "./Weather.jsx";

function getMinMaxTemperatureForDay(list, dayOfMonth) {
  const filteredList = list.filter(element => new Date(element.dt * 1000).getDate() === dayOfMonth);

  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;

  filteredList.forEach(element => {
    const singleMaxTemperature = element.main.temp_max;
    if (singleMaxTemperature > max) {
      max = Math.round(singleMaxTemperature);
    }
    const singleMinTemperature = element.main.temp_min;
    if (singleMinTemperature < min) {
      min = Math.round(singleMaxTemperature);
    }
  });

  return {
    minTemperature: min,
    maxTemperature: max,
    description: (filteredList[4] || filteredList.pop()).weather[0].description
  };
}

function getDayOfWeekName(dayOffset) {
  const todayDayOfWeek = new Date().getDay();
  let resultDayOfWeek = (todayDayOfWeek + dayOffset) % 7;

  const dayNames = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };
  return dayNames[resultDayOfWeek];
}

function getDateAfterNDays(daysIntoFuture) {
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

  const millisecondsIntoFuture = MILLISECONDS_IN_A_DAY * daysIntoFuture;
  const nowTimestamp = new Date().valueOf();
  const timestamp = nowTimestamp + millisecondsIntoFuture;
  return new Date(timestamp);
}

export default class ForecastContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      forecast: [],
      isReady: false
    };
  }

  componentDidMount() {
    if (this.props.city && this.props.countryCode) {
      this.forecastApi();
    }
  }

  forecastApi = async () => {
    const cityData = this.props.city;
    const countryData = this.props.countryCode;
    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityData},${countryData}&appid=403cb31deec233cc32ad204865bf0e56&units=metric`
    );
    const data = await apiCall.json();
    console.log(data);
    const forecast = [
      getMinMaxTemperatureForDay(data.list, getDateAfterNDays(1).getDate()),
      getMinMaxTemperatureForDay(data.list, getDateAfterNDays(2).getDate()),
      getMinMaxTemperatureForDay(data.list, getDateAfterNDays(3).getDate()),
      getMinMaxTemperatureForDay(data.list, getDateAfterNDays(4).getDate()),
      getMinMaxTemperatureForDay(data.list, getDateAfterNDays(5).getDate())
    ];
    this.setState({
      forecast: forecast,
      isReady: true
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city || prevProps.countryCode !== this.props.countryCode) {
      console.log(prevProps.city);
      this.forecastApi();
    }
  }

  render() {
    return (
      <div className="forecast-container container">
        {this.state.isReady ? (
          <div className="row no-gutters">
            <ForecastDay
              dayName={getDayOfWeekName(1)}
              description={this.state.forecast[0].description}
              isMetricActive={this.props.isMetricActive}
              temperature={{
                min: this.state.forecast[0].minTemperature,
                max: this.state.forecast[0].maxTemperature
              }}
            />
            <ForecastDay
              dayName={getDayOfWeekName(2)}
              description={this.state.forecast[1].description}
              isMetricActive={this.props.isMetricActive}
              temperature={{
                min: this.state.forecast[1].minTemperature,
                max: this.state.forecast[1].maxTemperature
              }}
            />
            <ForecastDay
              dayName={getDayOfWeekName(3)}
              description={this.state.forecast[2].description}
              isMetricActive={this.props.isMetricActive}
              temperature={{
                min: this.state.forecast[2].minTemperature,
                max: this.state.forecast[2].maxTemperature
              }}
            />
            <ForecastDay
              dayName={getDayOfWeekName(4)}
              description={this.state.forecast[3].description}
              isMetricActive={this.props.isMetricActive}
              temperature={{
                min: this.state.forecast[3].minTemperature,
                max: this.state.forecast[3].maxTemperature
              }}
            />
            <ForecastDay
              dayName={getDayOfWeekName(5)}
              description={this.state.forecast[4].description}
              isMetricActive={this.props.isMetricActive}
              temperature={{
                min: this.state.forecast[4].minTemperature,
                max: this.state.forecast[4].maxTemperature
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const ForecastDay = props => {
  return (
    <div className="col single-container">
      <span className="forecast-dayName">{props.dayName}</span>
      <div className="col weather-block">
        <div className="d-inline-block forecast-weather__container">
          <div
            className="forecast-weather__icon weather__icon"
            style={getSpriteStyle(props.description)}
          />
        </div>
        <span className="forecast-temperature forecast-temp-min">
          {formatTemperature(props.temperature.min, props.isMetricActive)}°
        </span>
        <span className="forecast-temperature forecast-temp-max">
          {formatTemperature(props.temperature.max, props.isMetricActive)}°
        </span>
      </div>
      <span className="weather__forecast-value">{props.description}</span>
    </div>
  );
};
