const express = require('express');

const useradminRouter = express.Router();
const useradminController = require('../controller/useradmin.controller');

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({error: 'Be kell jelentkezned'});
    }
}

useradminRouter.route('/')
  .get(useradminController.listUsers);

useradminRouter.route('/:id')
  .put(useradminController.editUser);

module.exports = useradminRouter;