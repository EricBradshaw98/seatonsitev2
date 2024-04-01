const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const bcrypt = require("bcrypt");
const { query } = require('./db/db'); 
const jwt = require('jsonwebtoken');
const auth = require("./auth");
const cors = require('cors');
const front = process.env.FRONT_ADDRESS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const photosRouter = require('./routes/photos');
const listingsRouter = require('./routes/listings');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const protectedRouter = require('./routes/protected');
const eventRouter = require('./routes/events');
const app = express();

app.use(cors({ origin: front }));



// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


//use section
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);
app.use('/listings', listingsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/protected', protectedRouter);
app.use('/events',eventRouter);


module.exports = app;
