const express = require('express');
const { insertUserQuery, getUserById, removeUser } = require('../db/queries/userQueries');
const register = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');



register.post("/", async (request, response) => {
  try {
    
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    // Execute an SQL query to insert the new user into the database
    const user = await insertUserQuery(request.body.email, hashedPassword, request.body.first_name, request.body.last_name, request.body.username);

    response.status(201).send({
      message: "User Created Successfully",
      result: user 
    });
  } catch (error) {
    response.status(500).send({
      message: "Error creating user",
      error: error.message // Send only the error message to avoid exposing sensitive info
    });
  }
});

register.delete("/", async (request, response) => {
  const { id, password } = request.body;

  try {
    // Get the user from the database
    const user = await getUserById(id);

    // If user does not exist
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return response.status(400).json({ message: "Passwords do not match" });
    }

    // Remove the user from the users table
    const removedUserResult = await removeUser(id);

    // Return the removed user data
    response.json({
      removedUser: removedUserResult,
      message: "User removed successfully"
    });
  } catch (error) {
    console.error("Error deleting:", error);
    response.status(500).json({ message: "Error removing user", error: error.message });
  }
});






module.exports = register;