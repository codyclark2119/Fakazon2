const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  seller: { type: String, required: true },
  description: String,
  price: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model('item', ItemSchema);
