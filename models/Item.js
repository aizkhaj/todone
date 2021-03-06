const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const itemSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "You can't save a blank task!"
  },
  complete: Boolean
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {model: Item, schema: itemSchema};
