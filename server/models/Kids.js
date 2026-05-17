const mongoose = require('mongoose');

const KProductSchema = new mongoose.Schema({
  title: String,
  gender: String,
  description: String,
  category: String,
  price: Number,
  sale: Boolean,
  size: [String],
  img: [String],
});

const KProductModel = mongoose.model('kid', KProductSchema);

module.exports = KProductModel;