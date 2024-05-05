// users.js
const express = require('express');
const galleries = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary

galleries.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM galleries');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

galleries.get('/:galleryId', async (req, res) => {
  const { galleryId } = req.params; // Extract the galleryId parameter from the URL
  try {
    const result = await db.query('SELECT * FROM photos WHERE gallery_id = $1', [galleryId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


 

module.exports = galleries;