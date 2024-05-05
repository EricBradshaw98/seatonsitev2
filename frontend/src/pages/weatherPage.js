import React from 'react';
import tomorrow from '../assets/tomorrow.png';
import WeatherToDay from '../components/WeatherToday';
import '../styles/WeatherPage.scss';

const WeatherPage = ({ weather }) => {
  console.log('weatherpage', weather);

  // Extract the first object from the weather array
  const firstWeatherData = weather && weather.length > 0 ? weather[0] : null;

  return (
    
      <div className="entireweather">
    <div className="weatherpage">
    
      
      <WeatherToDay weather={firstWeatherData} />
    
    </div>
    </div>
    
  );
};

export default WeatherPage;