const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "You can't save a blank task!"
  },
  complete: Boolean
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
