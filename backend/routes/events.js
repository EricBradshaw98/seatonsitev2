// users.js
const express = require('express');
const events = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
const { insertEventQuery, getEventByName, deleteEventByName } = require('../db/queries/eventQueries.js')



events.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


events.post('/', async (request, response) => {
  try {
    console.log("reqdesc",request.body)
    const event = await insertEventQuery(request.body.description, request.body.user_id, request.body.event_name, request.body.event_start, request.body.event_end, request.body.image, request.body.active)

    
    response.status(201).send({
      message: "Event Created Successfully",
      result: event 
    });
  } catch (error) {
    response.status(500).send({
      message: "Error creating event",
      error: error.message 
    });
  }
  
})

events.delete('/:event_name', async (request, response) => {
  try {
    const eventToDelete = await getEventByName(request.params.event_name);

    
    if (!eventToDelete) {
      return response.status(404).send({
        message: "Event not found"
      });
    }

    
    if (eventToDelete.user_id !== request.body.user_id) {
      return response.status(403).send({
        message: "Unauthorized. User does not have permission to delete this event."
      });
    }

    await deleteEventByName(request.params.event_name);

    response.status(200).send({
      message: "Event deleted successfully"
    });
  } catch (error) {
    response.status(500).send({
      message: "Error deleting event",
      error: error.message // Send only the error message to avoid exposing sensitive info
    });
  }
});

module.exports = events;