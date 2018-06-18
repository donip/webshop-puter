const mongoose = require('mongoose');


const orderSchema = mongoose.Schema(
  {
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      pName: {
        type: String,
        required: false,
      },
      pPrice: {
        type: Number,
        required: false,
      },
    }],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', orderSchema);
