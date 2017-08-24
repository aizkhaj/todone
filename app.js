const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// import environment variables
require('dotenv').config({path: 'variables.env'});

// Connect to our db
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});


const app = express();
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

module.exports = app;
