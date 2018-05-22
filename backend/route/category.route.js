const express = require('express');
const categoryController = require('../controller/category.controller');
const multer = require('multer');

const categoryRouter = express.Router();

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Be kell jelentkezned' });
  }
}

categoryRouter.route('/')
  .get(categoryController.list)
  .post(loggedIn, categoryController.create);

categoryRouter.route('/:id')
  .get(categoryController.find)
  .put(loggedIn, categoryController.update)
  .delete(loggedIn, categoryController.remove);


module.exports = categoryRouter;
