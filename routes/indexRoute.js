const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => res.redirect('/messages'));

router.get('/sign-up', (req, res) =>
  res.render('sign-up-form', { title: 'Sign up' })
);

router.post(
  '/sign-up',
  [
    body('username').isEmail().withMessage('Email is not valid'),
    body('firstName')
      .isAlpha()
      .withMessage('First name must contain alphabets only'),
    body('lastName')
      .isAlpha()
      .withMessage('Last name must contain alphabets only'),
    body('confirm-password')
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Passwords don't match"),
  ],
  async (req, res, next) => {
    const errorsArray = validationResult(req).errors;
    if (!errorsArray.length) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query(
          'insert into users (username, password, first_name, last_name, membership) values ($1, $2, $3, $4, $5)',
          [
            req.body.username,
            hashedPassword,
            req.body.firstName,
            req.body.lastName,
            false,
          ]
        );
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
);

router.get('/log-in', (req, res) => {
  res.render('log-in-form', { title: 'Log in' });
});

router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/log-in',
  })
);

router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
