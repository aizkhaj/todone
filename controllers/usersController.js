const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.showProfile = (req, res) => {
  res.json("This is where you can access your user profile");
};
