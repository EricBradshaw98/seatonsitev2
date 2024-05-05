const express = require('express');
const api = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
const axios = require('axios');
require('dotenv').config();



api.get('/googlemap', (req, res) => {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey: googleMapsApiKey });
});


let lastUpdateTime = 0; // Variable to store the timestamp of the last API call

api.post('/weather', async (req, res) => {
  try {
    
    const currentTime = Date.now();
    const fifteenMinutes = 60 * 60 * 1000; // 15 minutes in milliseconds

    // Check if 15 minutes have passed since the last API call
    if (currentTime - lastUpdateTime >= fifteenMinutes) {
      
      const apiKey = process.env.TOMORROW_API_KEY;
      const lat = '43.97';
      const lon = '-79.14';
      const parameters = {
        temperature: {
          units: 'metric'
        },
        windSpeed: {
          units: 'metric'
        },
        windDirection: {
          units: 'metric'
        },
        windGust: {
          units: 'metric'
        },
        precipitationProbability: {
          units: 'metric'
        },
        uvIndex: {
          units: 'metric'
        },
        weatherCode: {}
      };

      const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=${Object.keys(parameters).join(',')}&timesteps=1d&units=metric&apikey=${apiKey}`;

      // Make a GET request to the Tomorrow.io API
      const response = await axios.get(apiUrl);

      const weatherData = response.data;

      if (weatherData && weatherData.data && weatherData.data.timelines && weatherData.data.timelines.length > 0) {

        await db.query('DELETE FROM weather');
        const intervals = weatherData.data.timelines[0].intervals;

        // Check if intervals array exists and is not empty
        if (intervals && intervals.length > 0) {
          for (const interval of intervals) {
            const weatherValues = interval.values;
            const insertQuery = `INSERT INTO weather (timestamp, code, temperature, wind_speed, wind_direction, wind_gust, precipitation_probability, uv_index) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const insertValues = [interval.startTime, weatherValues.weatherCode, weatherValues.temperature, weatherValues.windSpeed, weatherValues.windDirection, weatherValues.windGust, weatherValues.precipitationProbability, weatherValues.uvIndex];
            
            await db.query(insertQuery, insertValues);
          }

          // Update the lastUpdateTime variable
          lastUpdateTime = currentTime;

          // Send the weather data back to the client
          res.json(response.data);
        } else {
          // Handle empty intervals in the response
          res.status(500).json({ error: 'Empty intervals in the response from the weather API' });
        }
      } else {
        // Handle empty response from the API
        res.status(500).json({ error: 'Empty response from the weather API' });
      }
    } else {
      console.log("time not elapsed")
      res.status(200).json({ message: 'Weather data has not been updated yet.' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



api.get('/weatherupdated', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM weather');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = api;