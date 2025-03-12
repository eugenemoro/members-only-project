const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/log-in');
  }
}

messageRouter.get('/', messageController.getMessages);

messageRouter.get('/new', isAuthenticated, messageController.getNewMessage);

messageRouter.post('/new', isAuthenticated, messageController.postNewMessage);

messageRouter.get('/:id', isAuthenticated, messageController.getMessageDetails);

messageRouter.get(
  '/:id/edit',
  isAuthenticated,
  messageController.getEditMessage
);

messageRouter.post(
  '/:id/edit',
  isAuthenticated,
  messageController.postMessageDetails
);

messageRouter.get(
  '/:id/delete',
  isAuthenticated,
  messageController.getDeleteMessage
);

module.exports = messageRouter;
