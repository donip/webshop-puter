const Product = require('../models/product');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Product.find({})
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },

  find: (req, res) => {
    Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },

  create: (req, res) => {
    Product.create(req.body)
      .then(product => res.send(product))
      .catch(err => res.send(err));
  },

  update: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },

  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
};
