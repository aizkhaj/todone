const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.createUser = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  User.create(user);
  res.json({message: "User created"});
}

exports.showProfile = (req, res) => {
  res.json("This is where you can access your user profile");
};
