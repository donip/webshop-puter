const Product = require('../models/product');
const Users = require('../models/user');

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
