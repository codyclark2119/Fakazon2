const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  address: {
    street: { type: String },
    apt: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  payment: {
    cardnumber: { type: String },
    cardexp: { type: String },
    cardccv: { type: String },
    cardaddress: {
      cardstreet: { type: String },
      cardapt: { type: String },
      cardcity: { type: String },
      cardstate: { type: String },
      cardzip: { type: String }
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
