const mongoose = require('mongoose');
const List = mongoose.model('List');

exports.allLists = (req, res) => {
  res.json("This is where all the lists show up.");
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
  res.json({message: "List created."});
};
