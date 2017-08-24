const mongoose = require('mongoose');
// import environment variables
require('dotenv').config({path: 'variables.env'});

// Connect to our db
mongoose.connect(process.env.DATABASE);

const express = require('express');
const bodyParser = require('body-parser');


const app = express();


module.exports = app;
