const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./auth.js')();
// instantiate an express app.
const app = express();
// import environment variables
require('dotenv').config({path: 'variables.env'});

// Connect to our db
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(auth.initialize());


// import all of our models
const User = require('./models/User');
const userModel = User.model;
const Item = require('./models/Item');
const List = require('./models/List');

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
