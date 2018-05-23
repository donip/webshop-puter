const Comment = require('../models/comment');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/** @module Product */

module.exports = {
  /**
   * kilistáz minden comment-t
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Array} - visszatér a comment-k tömbjével
   */
  list: (req, res) => {
    Comment.find({})
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
  * mongo _id alapján megkeres egy comment-t
  * @param {object} req - HTTP request objektum
  * @param {object} res - HTTP response objektum
  * @return {Object} visszaküldi a keresendő kategóriát
  */
  find: (req, res) => {
    Comment.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
   * Generál egy comment-t
   * csak admin jogosultsággal fut le ha nem admin akkor visszadob egy hibát
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return létrehozott comment object-jét küldi vissza
   */
  create: (req, res) => {
    Comment.create(req.body)
      .then(cat => res.send(cat))
      .catch(err => res.send(err));
  },
  /**
   * update-el egy comment-t az id alapján
   * a productname-ből generálja a product url-t és imgurl-t.
   * csak admin jogosultsággal működik.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - az update-d comment régi értékével tér vissza
   */
  update: (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
      .then((product) => {
        res.json(product);
      })
      .catch(err => res.send(err));
  },
  /**
  * Eltávolít egy comment-t az id alapján
  * Csak admin jogosultsággal működik.
  *@param {object} req - HTTP request objektum
  *@param {object} res - HTTP response objektum
  *@return {Object} - A törölt elemet küldi vissza
  */
  remove: (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch(err => res.send(err));
  },
};
