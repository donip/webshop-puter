const Order = require('../models/order');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Order.find({})
      .populate('customer', 'username email')
      .populate('products.product', 'productname brand price category')
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  find: (req, res) => {
    Order.findById(req.params.id)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  create: (req, res) => {
    Order.create(req.body)
      .then(order => res.send(order))
      .catch(err => res.send(err));
  },

  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  remove: (req, res) => {
    Order.findByIdAndRemove(req.params.id)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },
};
