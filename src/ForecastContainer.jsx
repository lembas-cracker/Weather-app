import React, { Component } from 'react'


export default class ForecastContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      shouldShowLocation: false
    }
  }

  showLocation () {
    this.setState({
      shouldShowLocation: true
    })
  }

  render () {
    return (
      <div className='forecast-container container'>
        <div className='row no-gutters'>
          <div className='col'>
            {this.state.shouldShowLocation ? <ForecastLocation /> : null}
          </div>
        </div>
        <div className='row no-gutters'>
            <button onClick={this.showLocation.bind(this)}></button>
            <ForecastDay dayName='Day-1' />
            <ForecastDay dayName='Day-2' />
            <ForecastDay dayName='Day-3' />
            <ForecastDay dayName='Day-4' />
            <ForecastDay dayName='Day-5' />
        </div>
      </div>
    )
  }
}

function ForecastDay (props) {
  return (
    <div className='col single-container' onClick={props.clickHandler}>
      {props.dayName}:
      <div className='col-4 weather-block'></div>
    </div>
  )
}

class ForecastLocation extends Component {
  constructor () {
    super()
    this.state = {
      city: { name: null }
    }
  }

  componentDidMount () {
    fetch(
      'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=403cb31deec233cc32ad204865bf0e56'
    )
      .then(results => {
        return results.json()
      })
      .then(data => {
        const city = data.city
        this.setState({
          city: city
        })
        console.log(data);
      })
  }

  render () {
    return this.state.city.name
  }
}
