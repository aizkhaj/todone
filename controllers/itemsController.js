const mongoose = require('mongoose');
const Item = mongoose.model('Item');

exports.createItem = (req, res) => {
  const item = {
    title: req.body.title,
    complete: false
  }
  Item.create(item);
  res.json({message: 'Item created.'});
};

exports.deleteItem = (req, res) => {
  res.json("This is where you delete an item.")
}
