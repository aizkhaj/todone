const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const listSchema = new mongoose.Schema({
  user_id: Schema.Types.ObjectId,
  item_id: Schema.Types.ObjectId,
  title: String,
  private: Boolean
});

const List = mongoose.model('List', listSchema);

module.exports = List;
