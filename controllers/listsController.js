const mongoose = require('mongoose');
const List = mongoose.model('List');

exports.allLists = (req, res) => {
  List.find();
};

exports.showList = (req, res) => {
  res.json("This is where an individual list shows up.");
};

exports.createList = (req, res) => {
  const list = {
    list_id: new mongoose.Types.ObjectId(req.list.id),
    title: req.body.title,
    private: req.body.private
  }
  List.create(list);
  res.json({ message: "List created." });
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