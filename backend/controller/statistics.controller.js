const Users = require('../models/user');
const Orders = require('../models/order');
/**
 * Exporálja az összes felhasználóadatot.
 */
module.exports = {
  getUsers: (req, res) => {
    Users.find({}).then(user => res.json(user))
      .catch(err => res.send(err));
  },
};
/**
 * Exporálja az összes rendelés adatát.
 */
module.exports = {
  getOrders: (req, res) => {
    Orders.find({}).then(orders => res.json(orders))
      .catch(err => res.send(err));
  },
};
