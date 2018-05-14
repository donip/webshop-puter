const express = require('express');

const blogpostRouter = express.Router();
const blogpostController = require('../controller/blogpost.controller');

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({error: 'Be kell jelentkezned'});
    }
}

blogpostRouter.route('/')
  .get(blogpostController.list)
  .post(loggedIn, blogpostController.create);

blogpostRouter.route('/:id')
  .get(blogpostController.find)
  .put(loggedIn, blogpostController.update)
  .delete(loggedIn, blogpostController.remove);

module.exports = blogpostRouter;
