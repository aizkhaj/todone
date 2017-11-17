const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('../models/Item');
const User = require('../models/User');
mongoose.Promise = global.Promise;

const listSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  items: [Item.schema],
  title: String,
  private: Boolean
});

const List = mongoose.model('List', listSchema);

module.exports = {model: List, schema: listSchema};