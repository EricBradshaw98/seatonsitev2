import React from 'react';
import tomorrow from '../assets/tomorrow.png';
import WeatherPage from '../styles/WeatherPage.scss';

const WeatherToDay = ({ weather }) => {
  console.log('weather', weather); // Log the content of the weather prop

  const importIcon = (icon) => {
    
    // Assuming the icon name contains the code (e.g., '01d.png', '02d.png', etc.)
    const code = weather.code.substring(0, 4); // Extract the code from the icon filename
    console.log(code);

    // Ensure weather exists and has the icon property
    return require(`../assets/png/${code}.png`); // Import the icon dynamically
  };

  // Ensure weather exists and has all required properties
  if (!weather) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  const { code, precipitation_probability, temperature, timestamp, uv_index,wind_direction, wind_gust, wind_speed } = weather;

  return (
    
    
    <div className="weatherarticle">
      
      <div>
        <img className="weatherimg" src={importIcon(code)} alt="Weather Icon" />
      </div>
      <p>{timestamp}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {wind_speed} m/s</p>
      <p>Precipitation Probability: {precipitation_probability}%</p>
      <p>UV Index: {uv_index}</p>
    </div>
    
  );
};

export default WeatherToDay;