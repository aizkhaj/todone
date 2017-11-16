const mongoose = require('mongoose');
const List = mongoose.model('List');

exports.allLists = (req, res) => {
  List.find((err, lists) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (lists === null) {
        res.json({message: "seems like you don't have any lists showing up here..."});
      }
      res.status(200).json(lists);
    }
  });
};

exports.showList = (req, res) => {
  res.json("This is where an individual list shows up.");
};

exports.createList = (req, res) => {
  const list = {
    user_id: new mongoose.Types.ObjectId(req.user.id),
    title: req.body.title,
    private: req.body.private
  }
  List.create(list);
  res.json({ message: "List created." });
};

exports.updateList = (req, res) => {
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
  // Find the list in question first.
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