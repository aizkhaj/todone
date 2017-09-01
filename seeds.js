const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('./models/User.js');
const userModel = User.model;

const admin = new User({
  username: 'aiz',
  password: 'hello'
});

admin.save;
