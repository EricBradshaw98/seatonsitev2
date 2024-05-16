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

galleries.post('/', async (req, res) => {
  const { name, description, user_id, image, active } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO galleries (name, description, user_id, image, active, created_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING *;
    `, [name, description, user_id, image, active]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT route to update an existing gallery
galleries.put('/:galleryId', async (req, res) => {
  const { galleryId } = req.params;
  const { name, description, image, active } = req.body;
  try {
    const result = await db.query(`
      UPDATE galleries
      SET name = $1, description = $2, image = $3, active = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *;
    `, [name, description, image, active, galleryId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE route to delete a gallery
galleries.delete('/:galleryId', async (req, res) => {
  const { galleryId } = req.params;
  try {
    await db.query('DELETE FROM galleries WHERE id = $1', [galleryId]);
    res.sendStatus(204); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
 

module.exports = galleries;