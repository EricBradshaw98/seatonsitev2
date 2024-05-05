const express = require('express');
const jwt = require('jsonwebtoken');
const { getUserByEmail, insertUserQuery } = require('../db/queries/userQueries');
const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const protected = express.Router();
const secret = process.env.JWT_SECRET
// Login route


// Protected route example
protected.get('/', verifyToken, (req, res) => {
    // If token verification succeeded, user is authorized
    res.json({ message: 'Protected route accessed successfully' });
   
   
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    });
}

module.exports = protected;