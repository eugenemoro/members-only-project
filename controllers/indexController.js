const { validationResult } = require('express-validator');
const db = require('../db/userQueries');
const bcrypt = require('bcryptjs');

function getHome(req, res) {
  res.redirect('/messages');
}  

function getSignUp(req, res) {
  res.render('sign-up-form', { title: 'Sign up' })
}

async function postSignUp(req, res, next) {
  const errorsArray = validationResult(req).errors;
  if (!errorsArray.length) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.addUser(req.body, hashedPassword);
      res.redirect('/log-in');
    } catch (error) {
      res.render('sign-up-form', {
        title: 'Sign up',
        errors: [{ msg: 'Email is already registered' }],
        formBody: req.body,
      });
    }
  } else {
    res.render('sign-up-form', {
      title: 'Sign up',
      errors: errorsArray,
      formBody: req.body,
    });
  }
}

function getLogin(req, res) {
  const errorMessage = req.flash('error');
  res.render('log-in-form', { title: 'Log in', errorMessage });
}

function getLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

function getMembership(req, res) {
  res.render('membership', { title: 'Membership', errors: [] });
}

async function postMembership(req, res) {
  const { membershipCode } = req.body;
  if (membershipCode === process.env.MEMBER_CODE) {
    await db.setMembership(req.user.user_id);
    res.redirect('/');
  } else {
    res.render('membership', {
      title: 'Membership',
      errors: [{ msg: 'Wrong code' }],
    });
  }
}

module.exports = {
  getHome,
  getSignUp,
  postSignUp,
  getLogin,
  getLogout,
  getMembership,
  postMembership
}