const mongoose = require('mongoose');
const Item = mongoose.model('Item');

exports.newItem = (req, res) => {
  res.json("This is where a user submits a new Item");
};

exports.createItem = (req, res) => {
  res.json("This is where a post request to create a new Item is sent");
};

exports.deleteItem = (req, res) => {
  res.json("This is where you delete an item.")
}
