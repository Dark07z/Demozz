const mongoose = require('mongoose');

const WProductSchema = new mongoose.Schema({
  title: String,
  gender: String,
  description: String,
  category: String,
  price: Number,
  sale: Boolean,
  size: [String],
  img: [String],
});

const WProductModel = mongoose.model('women', WProductSchema);

module.exports = WProductModel;
