const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const List = mongoose.model('List');
const User = mongoose.model('User');

exports.allItems = (req, res) => {
  const user = User.findById(req.user.id).exec();
  
  user.then( user => {
    const list = user.lists.id(req.params.list_id);

    if (list.items === null) {
      res.json({ message: "seems like there aren't any items yet..." });
    }

    res.status(200).json(list.items);
  }).catch(err => res.status(500).send(err));
  
}

exports.createItem = (req, res) => {
  const user = User.findById(req.user.id).exec();
  
  user.then(user => {
      const list = user.lists.id(req.params.list_id);
      console.log("is this the correct list? ", list);

      const item = {
        title: req.body.title,
        complete: false
      }

      list.items.push(item);
      user.save();
      console.log("this user's tasks: ", list.items);
      res.json({message: 'new item successfully saved.'})
  }).catch(err => res.status(500).send(err));
};

exports.updateItem = (req, res) => {
  // incomplete
  const user = User.findById(req.user.id).exec();
  
  user.then(user => {
    const list = user.lists.id(req.params.list_id);
    const items = list.items;
    const item = items.id()
    const task = {
      title: req.body.title,
      complete: false
    }

    list.items.push(task);
    user.save();
    console.log("this user's tasks: ", list.items);
    res.status(200).json({
      message: "Item updated.",
      update: item
    });
  }).catch(err => res.status(500).send(err));
};