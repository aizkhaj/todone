const mongoose = require('mongoose');
const List = mongoose.model('List');

exports.allLists = (req, res) => {
  res.json("This is where all the lists show up.");
};

exports.showList = (req, res) => {
  res.json("This is where an individual list shows up.");
};

exports.newList = (req, res) => {
  res.json("This is where you create a new list on a form.")
};

exports.createList = (req, res) => {
  res.json("This sends a post request to create the new list from the form.")
};
