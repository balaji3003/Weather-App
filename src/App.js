import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('London');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'c787dab8838e6164839124590fb67df9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="container my-5" style={{ backgroundColor: '#f0f0f0' }}>
      <nav className="navbar navbar-light bg-light justify-content-center mb-4">
        <span className="navbar-brand mb-0 h1">Weather App</span>
      </nav>

      <div className="input-group mb-3 text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
          value={location}
          onChange={handleLocationChange}
          style={{ textAlign: 'center' }}
        />
      </div>

      {weather && (
        <div className="card text-center">
          <div className="card-header">
            Weather in {weather.name}, {weather.sys.country}
          </div>
          <div className="card-body">
            <h5 className="card-title">Temperature: {weather.main.temp}°C (Feels like: {weather.main.feels_like}°C)</h5>
            <p className="card-text">Condition: {weather.weather[0].main} - {weather.weather[0].description}</p>
            <table className="table table-striped">
              <tbody>
                <tr><td>Humidity: {weather.main.humidity}%</td></tr>
                <tr><td>Pressure: {weather.main.pressure} hPa</td></tr>
                <tr><td>Wind: {weather.wind.speed} m/s, Direction: {weather.wind.deg}°</td></tr>
                <tr><td>Cloudiness: {weather.clouds.all}%</td></tr>
                <tr><td>Visibility: {weather.visibility} meters</td></tr>
                <tr><td>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</td></tr>
                <tr><td>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
