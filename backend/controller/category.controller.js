const Category = require('../models/category');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/** @module Product */

module.exports = {
  /**
   * kilistáz minden category-t
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Array} - visszatér a category-k tömbjével
   */
  list: (req, res) => {
    Category.find({})
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
  * mongo _id alapján megkeres egy category-t
  * @param {object} req - HTTP request objektum
  * @param {object} res - HTTP response objektum
  * @return {Object} visszaküldi a keresendő kategóriát
  */
  find: (req, res) => {
    Category.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
   * Generál egy category-t
   * csak admin jogosultsággal fut le ha nem admin akkor visszadob egy hibát
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return létrehozott category object-jét küldi vissza
   */
  create: (req, res) => {
    Category.create(req.body)
      .then(cat => res.send(cat))
      .catch(err => res.send(err));
  },
  /**
   * update-el egy category-t az id alapján
   * a productname-ből generálja a product url-t és imgurl-t.
   * csak admin jogosultsággal működik.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - az update-d category régi értékével tér vissza
   */
  update: (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
      .then((product) => {
        res.json(product);
      })
      .catch(err => res.send(err));
  },
  /**
  * Eltávolít egy category-t az id alapján
  * Csak admin jogosultsággal működik.
  *@param {object} req - HTTP request objektum
  *@param {object} res - HTTP response objektum
  *@return {Object} - A törölt elemet küldi vissza
  */
  remove: (req, res) => {
    Category.findByIdAndRemove(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch(err => res.send(err));
  },
};
