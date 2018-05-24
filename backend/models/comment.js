const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
