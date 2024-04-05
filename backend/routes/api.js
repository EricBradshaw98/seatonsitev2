const express = require('express');
const api = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
const axios = require('axios');
require('dotenv').config();



api.get('/googlemap', (req, res) => {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey: googleMapsApiKey });
});


api.get('/weather', async (req, res) => {
  try {
    const lat = '43.97'
    const lon = '-79.14'
      const apiKey = process.env.WEATHER_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      // Make a GET request to the OpenWeatherMap API
      const response = await axios.get(apiUrl);

      // Send the weather data back to the client
      res.json(response.data);
  } catch (error) {
      // Handle errors
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});

api.get('/weatherforecast', async (req, res) => {
  try {

    const lat = '43.97'
    const lon = '-79.14'
      const apiKey = process.env.WEATHER_API_KEY;
      const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`;

      // Make a GET request to the OpenWeatherMap API
      const response = await axios.get(apiUrl);

      // Send the weather data back to the client
      res.json(response.data);
  } catch (error) {
      // Handle errors
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = api;