import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/weatherWidget.scss';
import windgust from '../assets/wind_gust_air-512.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faWind, faCloud, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherIcon = (weatherDescription) => {
    const description = weatherDescription.toLowerCase();
    switch (true) {
      case description.includes('cloud'):
        return <FontAwesomeIcon icon={faCloud} />;
      case description.includes('sun') || description.includes('clear'):
        return <FontAwesomeIcon icon={faSun} />;
      case description.includes('rain'):
        return <FontAwesomeIcon icon={faCloudRain} />;
      // Add more cases for other weather conditions as needed
      default:
        return <FontAwesomeIcon icon={faSun} />; // Default icon
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setWeather(response.data);
        console.log('weather', response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  function degreesToDirection(degrees) {
    // Define cardinal directions
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  
    // Calculate index based on degrees (360 degrees divided by 8 cardinal directions)
    const index = Math.floor((degrees + 22.5) / 45);
  
    // Return the corresponding cardinal direction
    return directions[index];
  }

  return (
    <div className="weather-widget">
      
      <div className="weather-info">
      
        <div className="weather-description" id="weather-description">
        <div className="weather-icon">
        {weather ? getWeatherIcon(weather.weather[0].main) : 'Loading...'}
      </div>
          <p>{weather ? weather.weather[0].main : 'Loading...'}</p>
          <p>{weather ? weather.weather[0].description : 'Loading...'}</p>
        </div>
        <div className="weather-temperature" id="weather-temperature">
        <FontAwesomeIcon icon="fa-solid fa-temperature-three-quarters" className="weather-temperature-icon" />
        <p>Current Temperature: {weather ? weather.main.temp : 'Loading...'}°C</p>
        <p>Feels Like: {weather ? weather.main.feels_like : 'Loading...'}°C</p>
        <p>Lowest: {weather ? weather.main.temp_min : 'Loading...'}°C</p>
        <p>Highest: {weather ? weather.main.temp_max : 'Loading...'}°C</p>
        <p>Pressure: {weather ? weather.main.pressure : 'Loading...'}hPA</p>
        <p>Humidity: {weather ? weather.main.humidity : 'Loading...'}%</p>
        </div>
        <div className="weather-wind" id="weather-wind">
        <FontAwesomeIcon icon={faWind} className="wind-icon"/>
          <div className="wind-speed">Wind Speed: {weather ? weather.wind.speed : 'Loading...'} m/s</div>
          <div className="wind-direction">Wind Direction: {degreesToDirection(weather ? weather.wind.deg : 'Loading...')} </div>
          <div className="wind-gust">Wind Gust: {weather ? weather.wind.gust : 'Loading...'} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
