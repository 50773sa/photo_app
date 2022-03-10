
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// Instantiate express
const app = express();

// Middlewares
app.use(logger('dev'));// Logga alla requests
app.use(cors());//för att andra webbsidor ska kunna använda vårt API
app.use(express.json());//Tolka json data i body. Utan denna kan vi inte läsa in req.param 
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes'));

module.exports = app;
