const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: 'Please enter a name',
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// This creates a model using the specified schema.

// This makes the model available to our Node app.
module.exports = mongoose.model('User', userSchema);
