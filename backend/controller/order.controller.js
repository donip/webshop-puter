const Order = require('../models/order');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/** @module Order */
/**
 * Kilistázza a rendeléseket. Populate-tel hozzákapcsolja a user-eket és a product-okat
 * @param {Object} req - HTTP request objektum
 * @param {Object} res - HTTP response objektum
 * @return {Object} - a rendelések objektumát küldi vissza
 */
module.exports = {
  list: (req, res) => {
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        Order.find({})
          .populate('customer', 'username email')
          .populate('products.product', 'productname brand price category')
          .then(order => res.json(order))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },
  /**
   * Kilistázza egy rendelést id szerint. Populate-tel hozzákapcsolja a user-eket és a product-okat
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} egy rendelés objektumát küldi vissza
   */
  find: (req, res) => {
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        Order.findById(req.params.id)
          .then(order => res.json(order))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },
  /**
   * Generál egy rendelést activ státusszal.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - a rendelés objektumát küldi vissza
   */
  create: (req, res) => {
    req.body.status = 'active';
    Order.create(req.body)
      .then(order => res.send(order))
      .catch(err => res.send(err));
  },
  /**
   * admin jogosultságot ellenőriz,
   * majd frissíti az adott azonosítójú (id) rendelést
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - visszajelzést ad a művelet sikerességéről,
   * visszaadja az eredeti adatot is, ha sikeres
   */
  update: (req, res) => {
    // const test = this.checkAdmin(req, res);
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        Order.findByIdAndUpdate(req.params.id, req.body)
          .then(order => res.json({ success: 'Frissítés sikeres', old: order }))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },
  /**
   * Ellenőrzi az admin jogosultságot és kitöröl egy rendelést id szerint.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - a kitörölt megrendelés objektumát küldi vissza
   */
  remove: (req, res) => {
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        Order.findByIdAndRemove(req.params.id)
          .then(order => res.json(order))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },

  // checkAdmin: (req) => {
  //   if (req.user) {
  //     if (req.user.isAdmin === 'true') {
  //       return true;
  //     } return { err: 'Művelet megtagadva' };
  //   } return { err: 'Nincs bejelentkezve!' };
  // },

  clientList: (req, res) => {
    if (req.user) {
      Order.find({})
        .populate('customer', 'username email')
        .populate('products.product', 'productname brand price category')
        .then(order => res.json(order))
        .catch(err => res.send(err));
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },

};
