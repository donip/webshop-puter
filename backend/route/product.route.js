const express = require('express');

const productRouter = express.Router();
const productController = require('../controller/product.controller');

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Be kell jelentkezned' });
  }
}

productRouter.route('/')
  .get(productController.list)
  .post(loggedIn, productController.create);

productRouter.route('/:id')
  .get(productController.find)
  .put(loggedIn, productController.update)
  .delete(loggedIn, productController.remove);

productRouter.route('/url/:producturl').get(productController.findByUrl);

module.exports = productRouter;
