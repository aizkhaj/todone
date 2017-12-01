const mongoose = require('mongoose');
const List = mongoose.model('List');
const User = mongoose.model('User');

exports.allLists = (req, res) => {
  const user = User.findById(req.user.id).exec();

  user.then( user => {
    if (user.lists === null) {
      res.json({ message: "seems like you don't have any lists showing up here..." });
    }
    res.status(200).json(user.lists);
  }).catch(err => res.status(500).send(err));
};

exports.showList = (req, res) => {
  res.json("This is where an individual list shows up.");
};

exports.createList = (req, res) => {
  const user = User.findById(req.user.id).exec();

  user.then(user => {

      const list = {
        user_id: req.user.id,
        title: req.body.title,
        private: req.body.private
      }
      user.lists.push(list);
      user
        .save()
        .then(
          user => {
            res.json({ message: "List created.", list_id: user.lists[user.lists.length - 1].id });
          }
        )
        .catch();
  }).catch(err => err);
};

exports.updateList = (req, res) => {
  // this won't work anymore due to changing db relationship structure.
  List.findById(req.params.list_id, (err, list) => {
    if (err) {
      res.status(500).send(err);
    } else {
      list.title = req.body.title || list.title;
      list.private = req.body.private || list.private;

      list.save((err, list) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json({
          message: "List updated.",
          update: list
        });
      });
    }
  });
};

exports.deleteList = (req, res) => {
  // this won't work anymore due to changing db relationship structure.
  const listPromise = List.findById(req.params.list_id).exec();

  listPromise
    .then(list => {
      console.log(list);
      if (!list) {
        return res.status(401).json({ message: "hmm, something doesn't seem right here." });
      }

      List.remove({ _id: list.id }, (err) => {
        if (err) {
          console.log("Failed!", err);
        }
      });
      res.status(200).json({ message: "List deleted." });
    })
    .catch((err) => {
      console.log("Whoops!", err);
    });
};