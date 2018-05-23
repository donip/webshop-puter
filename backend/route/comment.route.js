const express = require('express');
const commentController = require('../controller/comment.controller');
const multer = require('multer');

const commentRouter = express.Router();

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Be kell jelentkezned' });
  }
}

commentRouter.route('/')
  .get(commentController.list)
  .post(loggedIn, commentController.create);

commentRouter.route('/:id')
  .get(commentController.find)
  .put(loggedIn, commentController.update)
  .delete(loggedIn, commentController.remove);


module.exports = commentRouter;
