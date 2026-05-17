const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  gender: String,
  description: String,
  category: String,
  price: Number,
  sale: Boolean,
  size: [String],
  img: [String],
});

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;
