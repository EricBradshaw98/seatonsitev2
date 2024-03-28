const { query } = require("../db");

async function getUserByEmail(email) {
  try {
    const getUserQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await query(getUserQuery, [email]);
    return result.rows[0]; 
  } catch (error) {
    throw new Error(`Error retrieving user by email: ${error.message}`);
  }
}

async function getUserById(id) {
  try {
    const getUserQuery = 'SELECT * FROM users WHERE id = $1';
    const result = await query(getUserQuery, [id]);
    return result.rows[0]; 
  } catch (error) {
    throw new Error(`Error retrieving user by ID: ${error.message}`);
  }
}

async function insertUserQuery(email, password, firstName, lastName, username) {
  try {
    const insertUserQuery = `
      INSERT INTO users (email, password, first_name, last_name, username, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
      RETURNING *`;
      
    const result = await query(insertUserQuery, [email, password, firstName, lastName, username]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error inserting user: ${error.message}`);
  }
}

async function removeUser(id) {
  try {
    const deleteUserQuery = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await query(deleteUserQuery, [id]);
    return result.rows[0]; 
  } catch (error) {
    throw new Error(`Error deleting user by ID: ${error.message}`);
  }
}


module.exports = {
  getUserByEmail,
  insertUserQuery,
  getUserById,
  removeUser
};