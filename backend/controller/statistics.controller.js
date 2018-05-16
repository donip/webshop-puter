const Product = require('../models/product');
const Users = require('../models/user');
const Orders = require('../models/order');

module.exports = {
  getProducts: (req, res) => {
    Product.find({}).then(product => res.json(product))
      .catch(err => res.send(err));
  },
};

module.exports = {
  getUsers: (req, res) => {
    Users.find({}).then(user => res.json(user))
      .catch(err => res.send(err));
  },
};

module.exports = {
  getOrders: (req, res) => {
    Orders.find({}).then(orders => res.json(orders))
      .catch(err => res.send(err));
  },
};
