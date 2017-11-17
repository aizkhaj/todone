const mongoose = require('mongoose');
// import environment variables
require('dotenv').config({path: 'variables.env'});

// Connect to our db
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const User = require('./models/User.js');
const userModel = User.model;
const bcrypt = require('bcryptjs');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

// Remove existing users.
userModel.collection.drop();

// Create a user
bcrypt.hash('hello', 10, (err, hash) => {
  // Store hash in your password DB.
  if (err) {
    return Error("Whoops, something went wrong!");
  } else {
    const admin = new userModel({
      username: "zaz1",
      password: hash
    });
    admin.save();
  }
});
console.log("1 user seeded.");

// Remove existing lists.

// Create a list.


