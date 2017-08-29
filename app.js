const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// import environment variables
require('dotenv').config({path: 'variables.env'});

// Connect to our db
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

// instantiate an express app.
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// import all of our models
require('./models/User');
require('./models/Item');
require('./models/List');

// mounts the routes.js route file
const routes = require('./routes/routes');
app.use('/api/v1', routes);

// set the server to listen on port
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// make the app instance accessible throughout the app.
module.exports = app;
