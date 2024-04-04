// users.js
const express = require('express');
const posts = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
const { insertPostQuery } = require('../db/queries/postQueries.js')


posts.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        posts.*, 
        users.username AS author_username, 
        users.first_name AS author_first_name, 
        users.last_name AS author_last_name
      FROM 
        posts
      INNER JOIN 
        users ON posts.user_id = users.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});




posts.post('/', async (request, response) => {
  try {
    console.log("reqdesc",request.body)
    const post = await insertPostQuery(request.body.post_description, request.body.post_name, request.body.user_id, request.body.post_photo)

    
    response.status(201).send({
      message: "Post Created Successfully",
      result: post 
    });
  } catch (error) {
    response.status(500).send({
      message: "Error creating post",
      error: error.message 
    });
  }
  
})

module.exports = posts;