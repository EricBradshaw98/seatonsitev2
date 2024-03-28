// users.js
const express = require('express');
const photos = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary

photos.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM photos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

photos.post("/", async (req, res) => {

  return res.status(200).json({ success: true });
});

module.exports = photos;