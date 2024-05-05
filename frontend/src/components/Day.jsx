import React from 'react';
import tomorrow from '../assets/tomorrow.png'
const Day = ({ icon, date, temperature, windSpeed, precipitationProbability, uvIndex }) => {


  const importIcon = (icon) => {
    // Assuming the icon name contains the code (e.g., '01d.png', '02d.png', etc.)
    const code = icon.substring(0, 4); // Extract the code from the icon filename
    console.log(code)
    return require(`../assets/png/${icon}.png`); // Import the icon dynamically
  };
  return (
    
    <div className="day">
      <div>
      <img className="weatherimg" src={importIcon(icon)} alt="Weather Icon" />
      </div>
      <p>{date}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <p>Precipitation Probability: {precipitationProbability}%</p>
      <p>UV Index: {uvIndex}</p>
      
    </div>
    
  );
};

export default Day;
