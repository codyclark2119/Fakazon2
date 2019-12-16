const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item'
    }
  ]
});

module.exports = Cart = mongoose.model('cart', CartSchema);
