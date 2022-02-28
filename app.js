

//!OK don´t touch

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// instantiate express
const app = express();

// middlewares
app.use(logger('dev'));// Logga alla requests
app.use(cors());//för att andra webbsidor ska kunna använda vårt API
app.use(express.json());//Tolka json data i body. Utan denna kan vi inte läsa in req.param 
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require('./routes'));

module.exports = app;
