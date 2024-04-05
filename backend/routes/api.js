const express = require('express');
const api = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary




api.get('/googlemap', (req, res) => {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey: googleMapsApiKey });
});

module.exports = api;