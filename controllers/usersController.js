const mongoose = require('mongoose');
const User = mongoose.model('User');
const List = mongoose.model('List');
const bcrypt = require('bcryptjs');
const jwt = require("jwt-simple");
const passport = require('passport');
const config = require('../config.js');

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

exports.loginUser = (req, res) => {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
  }
  const userPromise = User.findOne({ username: username }).exec();

  userPromise.then(user => {
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }

    bcrypt.compare(req.body.password, user.password)
      .then((response) => {
        if (!response) {
          return res.status(401).json({ message: "passwords did not match" });
        }
        // res === true
        const payload = { id: user.id };
        console.log(payload);
        const token = jwt.encode(payload, config.jwtSecret);
        return res.json({
          message: "here goes thy token.",
          token: token
        });
      })
      .catch((err) => {
        console.log("Failed!", err);
      });

      // List.find({user_id: user.id})
      // .populate('lists')
      // .exec((err, lists) => {
      //   if (err) {
      //     console.log("error: ", err);
      //   }
      //   console.log('user lists: ', lists);
      // })
  }).catch((err) => {
    console.log("Failed!", err);
  });
}

exports.deleteUser = (req, res) => {
  // Find user
  const currentUserPromise = User.findById(req.user.id).exec();

  currentUserPromise
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "hmm, something doesn't seem right here." });
      }

      User.remove({ _id: user.id }, (err) => {
        if (err) {
          console.log("Failed!", err);
        }
      });
      res.status(200).json({ message: "User deleted." });
    })
    .catch((err) => {
      console.log("Whoops!", err);
    });
  // User.findByIdAndRemove(req.user.id);
}

exports.showProfile = (req, res) => {
  res.json("This is where you can access your user profile");
};
