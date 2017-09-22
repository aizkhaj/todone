const mongoose = require('mongoose');
const Item = mongoose.model('Item');

exports.createItem = (req, res) => {
  const item = {
    title: req.body.title,
    complete: false
  }
  Item.create(item);
  res.json({ message: 'Item created.' });
};

exports.updateItem = (req, res) => {
  Item.findById(req.params.item_id, (err, item) => {
    if (err) {
      res.status(500).send(err);
    } else {
      item.title = req.body.title || item.title;
      item.complete = req.body.complete || item.complete;

      item.save((err, item) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json({
          message: "Item updated.",
          update: item
        });
      });
    }
  });
};