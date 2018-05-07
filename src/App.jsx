import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherContainer } from './One-day-forecast.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Know your weather</h1>
        </header>
        <WeatherContainer></WeatherContainer>
      </div>
    );
  }
}

export default App;
