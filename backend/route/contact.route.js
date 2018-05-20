const contactRouter = require('express').Router();
const ContactController = require('../controller/contact.controller');

contactRouter.post('/register', ContactController.register);

module.exports = contactRouter;
