const express = require('express');
const listing = express.Router(); // create an Express router
const multer = require('multer'); // for handling multipart/form-data (file uploads)
const path = require('path');
const db = require('../db/db.js'); // Adjust the path as necessary

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('/home/labber/seatonsitev2/frontend/public/uploads')); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the file name to its original name
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });




listing.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM listings');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// POST route for creating a new listing
listing.post("/", upload.single('image'), async (req, res) => {
  try {
    // Access form data using req.body
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const email = req.body.user_email;
    const imageFileName = req.file.filename;
    const ID = req.body.user_id // Get the filename of the uploaded image
   
    const imageUrl = imageFileName; // Concatenate file directory URL with filename

    // Insert data into the database
    const result = await db.query('INSERT INTO listings (name, price, description, imageurl, email, user_id ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, price, description, imageUrl, email, ID]);

    // Respond with success message
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = listing;