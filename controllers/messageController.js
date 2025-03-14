const db = require('../db/messageQueries');
const passport = require('passport');

async function getMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render('index', { title: 'Messages', messages });
}

async function getNewMessage(req, res) {
  res.render('new-message', { title: 'New message' });
}

async function postNewMessage(req, res) {
  const { title, message, authorId } = req.body;
  await db.addNewMessage(title, message, authorId, new Date());
  res.redirect('/');
}

async function getMessageDetails(req, res) {
  res.render('message', {
    title: 'Message details',
    message: await db.getMessage(req.params.id),
  });
}

async function getEditMessage(req, res) {
  res.render('edit-message', {
    title: 'Message update',
    message: await db.getMessage(req.params.id),
  });
}

async function postMessageDetails(req, res) {
  const messageId = req.params.id;
  const { title, message } = req.body;
  await db.updateMessage(messageId, title, message);
  res.redirect('/');
}

async function getDeleteMessage(req, res) {
  const messageId = req.params.id;
  await db.deleteMessage(messageId);
  res.redirect('/');
}

module.exports = {
  getMessages,
  getNewMessage,
  postNewMessage,
  getMessageDetails,
  getEditMessage,
  postMessageDetails,
  getDeleteMessage,
};
