import React from "react";
import spriteCoordinates from "./cloud-sprites";
import { TemperatureSwitch } from "./TemperatureSwitch.jsx";

export function getSpriteStyle(condition) {
  if (spriteCoordinates[condition] === undefined) {
    return {
      backgroundPosition: "top -" + 0 + "px left -" + 0 + "px"
    };
  }
  const x = spriteCoordinates[condition].x;
  const y = spriteCoordinates[condition].y;
  return {
    backgroundPosition: "top -" + y * 60 + "px left -" + x * 60 + "px"
  };
}

export function formatTemperature(temperature, isMetricActive) {
  const tempInCurrentUnit = isMetricActive ? temperature : (temperature * 9) / 5 + 32;
  return Math.round(tempInCurrentUnit);
}

const Weather = props => (
  <div className="weather__info">
    {props.city && props.countryCode && (
      <p className="weather__key">
        Location:{" "}
        <span className="weather__value">
          {props.city}, {props.countryCode}
        </span>
      </p>
    )}
    {props.temperature && (
      <div className="weather__key">
        Temperature:{" "}
        <span className="weather__value">
          {formatTemperature(props.temperature, props.isMetricActive)}°
        </span>
        <TemperatureSwitch
          isMetricActive={props.isMetricActive}
          toggleActive={props.toggleActive}
        />
      </div>
    )}
    {props.description && (
      <div className="weather__key">
        Conditions:
        <div className="d-inline-block weather__condition-container">
          <div className="weather__icon" style={getSpriteStyle(props.description)} />
          <span className="weather__condition-value">{props.description}</span>
        </div>
      </div>
    )}
    {props.error && <p className="weather__error">{props.error}</p>}
  </div>
);

export default Weather;
