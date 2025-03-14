const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');
const authValidator = require('../validators/authValidator');

messageRouter.get('/', messageController.getMessages);

messageRouter.get('/new', authValidator, messageController.getNewMessage);

messageRouter.post('/new', authValidator, messageController.postNewMessage);

messageRouter.get('/:id', authValidator, messageController.getMessageDetails);

messageRouter.get(
  '/:id/edit',
  authValidator,
  messageController.getEditMessage
);

messageRouter.post(
  '/:id/edit',
  authValidator,
  messageController.postMessageDetails
);

messageRouter.get(
  '/:id/delete',
  authValidator,
  messageController.getDeleteMessage
);

module.exports = messageRouter;
