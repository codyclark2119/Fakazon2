const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
      },
      quantity: {
        type: String, required: true
      }
    }
  ]
});

module.exports = Cart = mongoose.model('cart', CartSchema);
