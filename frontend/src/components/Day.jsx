import React from 'react';
import tomorrow from '../assets/tomorrow.png'
const Day = ({ icon, date, temperature, windSpeed, windDirection, precipitationProbability, uvIndex }) => {


  const importIcon = (icon) => {
    // Assuming the icon name contains the code (e.g., '01d.png', '02d.png', etc.)
    const code = icon.substring(0, 4); // Extract the code from the icon filename
    console.log(code)
    return require(`../assets/png/${icon}.png`); // Import the icon dynamically
  };

  function degreesToDirection(degrees) {
    // Ensure degrees are within [0, 360) range
    degrees = (degrees + 360) % 360;
    
    // Define direction ranges in degrees
    const directions = [
        { min: 0, max: 22.5, name: 'N' },
        { min: 22.5, max: 67.5, name: 'NE' },
        { min: 67.5, max: 112.5, name: 'E' },
        { min: 112.5, max: 157.5, name: 'SE' },
        { min: 157.5, max: 202.5, name: 'S' },
        { min: 202.5, max: 247.5, name: 'SW' },
        { min: 247.5, max: 292.5, name: 'W' },
        { min: 292.5, max: 337.5, name: 'NW' },
        { min: 337.5, max: 360, name: 'N' } // Wrap around for 360 degrees
    ];
    
    // Find the direction corresponding to the given degrees
    for (const direction of directions) {
        if (degrees >= direction.min && degrees < direction.max) {
            return direction.name;
        }
    }
    
    // Handle edge case where degrees are exactly 360
    return 'N';
}

  return (
    
    <div className="day">
      <div>
      <img className="weatherimg" src={importIcon(icon)} alt="Weather Icon" />
      </div>
      <p>{date}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <p>Wind Direction: {degreesToDirection(windDirection)} </p>
      <p>Precipitation Probability: {precipitationProbability}%</p>
      <p>UV Index: {uvIndex}</p>
      
    </div>
    
  );
};

export default Day;
