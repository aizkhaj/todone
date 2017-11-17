const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const List = mongoose.model('List');
const User = mongoose.model('User');

exports.allItems = (req, res) => {
  Item.find((err, items) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(items);
    }
  });
}

exports.createItem = (req, res) => {
  console.log(req.params.list_id);
  const user = User.findOne({_id: req.user.id}, {lists._id}).exec();
  user.then(user => {
    console.log("User list array: ", user);
    user.find({"lists._id": req.params.list_id}, (err, list) => {
      console.log("List: ", user.list);
      if (err) {
        res.status(500).send(err);
      } else {
        const item = {
          title: req.body.title,
          complete: false,
        }
        console.log('title: ', list.title);
        list.items.push(item);
        list.save();
        console.log('items on list: ', list.items);
        res.json({ message: 'Item created.' });
      }
    });
  }).catch(err => console.log(err));
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