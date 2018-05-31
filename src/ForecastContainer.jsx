import React, { Component } from 'react'

export class ForecastContainer extends Component {
  constructor() {
    super();
    this.state = {
      shouldShowLocation: false,
    };
  }

  showLocation() {
    this.setState({
      shouldShowLocation: true
    });
  }

  render() {
    return (
      <div className='WeatherContainer container'>
        <div className='row no-gutters'>
          <div className="col">
            {this.state.shouldShowLocation ? <ForecastLocation /> : null}
          </div>
        </div>
        <div className='row no-gutters'>
          <ForecastDay clickHandler={this.showLocation.bind(this)}/>
          <ForecastDay />
          <ForecastDay dayName="Monday" />
          <ForecastDay dayName="Tuesday" />
          <ForecastDay />
        </div>
      </div>
    )
  }
}



function ForecastDay(props) {
  return (
    <div className='col single-container' onClick={props.clickHandler}>{props.dayName}: 11C</div>
  )
}

class ForecastLocation extends Component {
  constructor() {
    super();
    this.state = {
      city: { name: null },
    };
  }

  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=403cb31deec233cc32ad204865bf0e56').then(results => {
      return results.json();
    }).then(data => {
      let city = data.city
      this.setState({
        city: city
      });
    })
  }

  render() {
    return this.state.city.name
  }
}
