import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherWidget.scss';
import windgust from '../assets/wind_gust_air-512.webp'
import tomorrow from '../assets/tomorrow.png'
import Day from './Day';


const WeatherWidget = ({ weather, dispatch }) => {
  

 
  if (!weather) {
    return <div>Loading...</div>; // You can add a loading indicator here
  }

  return (
    <div className="entire">
      <image className="icontoday"></image>
    <div className="weather-widget-container">
      {weather.map(data => (
        data && // Check if data object is defined
        <Day
          key={data.id}
          icon={data.code}
          date={new Date(data.timestamp).toLocaleDateString()}
          temperature={data.temperature}
          windSpeed={data.wind_speed}
          windDirection={data.wind_direction}
          precipitationProbability={data.precipitation_probability}
          uvIndex={data.uv_index}
        />
      ))}
      
    </div>
    <img className="tomorrowImage" src={tomorrow}></img>
    </div>
  );
};

export default WeatherWidget;