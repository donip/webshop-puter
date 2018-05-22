const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  rank: {
    type: Number,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', CategorySchema);
