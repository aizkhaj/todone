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
