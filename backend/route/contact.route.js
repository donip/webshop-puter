const contactRouter = require('express').Router();
const ContactController = require('../controller/contact.controller');

contactRouter.post('/sendClientMsg', ContactController.register);

module.exports = contactRouter;
