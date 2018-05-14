const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  producturl: {
    type: String,
    required: true,
    unique: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
