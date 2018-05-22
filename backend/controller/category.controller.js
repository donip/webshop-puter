const Category = require('../models/category');
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.Promise = require('bluebird');

/** @module Product */

module.exports = {
  /**
   * kilistáz minden productot
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Array} - visszatér a product-ok tömbjével
   */
  list: (req, res) => {
    Category.find({})
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
  * mongo _id alapján megkeres egy productot
  * @param {object} req - HTTP request objektum
  * @param {object} res - HTTP response objektum
  */
  find: (req, res) => {
    Category.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
   * Generál egy productot, a producturl-t és a imgurl generálja a file.path-ból
   * csak admin jogosultsággal fut le ha nem admin akkor visszadob egy hibát
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return létrehozott product object-jét küldi vissza
   */
  create: (req, res) => {
    Category.create(req.body)
      .then(cat => res.send(cat))
      .catch(err => res.send(err));
  },
  /**
   * update-el egy productot az id alapján
   * a productname-ből generálja a product url-t és imgurl-t.
   * csak admin jogosultsággal működik.
   * Amennyiben az imgurl property létezik törli az url-ből kinyert nevű imaget.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - az update-d product régi értékével tér vissza
   */
  update: (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
      .then((product) => {
        res.json(product);
      })
      .catch(err => res.send(err));
  },
  /**
  * Eltávolít egy productot az id alapján
  * és törli a hozzátartozó képet az imgurl-ből nyert img fájlnév és útvonal alapján.
  * Csak admin jogosultsággal működik.
  *@param {object} req - HTTP request objektum
  *@param {object} res - HTTP response objektum
  *@return {Object} - A törölt elemmet küldi vissza
  */
  remove: (req, res) => {
    Category.findByIdAndRemove(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch(err => res.send(err));
  },
};
