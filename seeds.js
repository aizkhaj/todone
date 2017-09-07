const mongoose = require('mongoose');
// import environment variables
require('dotenv').config({path: 'variables.env'});

// Connect to our db
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
console.log('im here');
const User = require('./models/User.js');
const userModel = User.model;

const admin = new userModel({
  username: 'aiz',
  password: 'hello'
});
admin.save();
