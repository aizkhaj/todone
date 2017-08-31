const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('../models/List');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'Please enter a name',
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lists: [List.schema]
  // embedded Lists document/model here so that we can say that each User has their own array of list objects.
});

// This creates a model using the specified schema.
const User = mongoose.model('User', userSchema);
// This makes the model available to our Node app.
module.exports = {model: User, schema: userSchema};
