import React, { Component } from "react";

export class TemperatureSwitch extends Component {
  render() {
    return (
      <div className="units d-inline-block">
        <span
          className={"btn metric" + (this.props.isMetricActive ? " active" : "")}
          onClick={this.props.toggleActive}
        >
          °C
        </span>
        <span
          className={"btn imperial" + (this.props.isMetricActive ? "" : " active")}
          onClick={this.props.toggleActive}
        >
          °F
        </span>
      </div>
    );
  }
}
