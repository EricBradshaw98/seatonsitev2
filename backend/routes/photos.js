// users.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const photos = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
const upload = multer({ dest: 'uploads/' });



photos.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM photos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

photos.get('/:gallery_id', async (req, res) => {
  const galleryId = req.params.gallery_id;
  try {
    const query = 'SELECT * FROM photos WHERE gallery_id = $1';
    const result = await db.query(query, [galleryId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

photos.post("/upload", upload.array('images'), async (req, res) => {
  try {
    const { user_id, gallery_id, description } = req.body;

    // Iterate over each uploaded image and insert it into the photos table
    const insertedPhotos = await Promise.all(req.files.map(async (file) => {
      const { filename } = file;
      const url = `/uploads/${filename}`;

      
      try {
        const query = `
          INSERT INTO photos (name, user_id, gallery_id, url, description, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          RETURNING *;
        `;
        const values = [filename, user_id, gallery_id, url, description];
        const result = await db.query(query, values);
        return result.rows[0];
      } finally {
        // Release the client back to the pool
      }
    }));

    res.json({ message: 'Images uploaded successfully', photos: insertedPhotos });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

module.exports = photos;