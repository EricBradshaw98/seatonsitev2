// users.js
const express = require('express');
const events = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary

events.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = events;