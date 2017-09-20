const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    // Store hash in your password DB.
    if (err) {
      return Error("Whoops, something went wrong!");
    } else {
      const newUser = {
        username: req.body.username,
        password: hash
      };
      User.create(newUser);
    }
  });
  res.json({ message: "User created" });
}

exports.showProfile = (req, res) => {
  res.json("This is where you can access your user profile");
};
