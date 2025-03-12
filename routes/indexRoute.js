const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../db/pool');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => res.redirect('/messages'));

router.get('/sign-up', (req, res) =>
  res.render('sign-up-form', { title: 'Sign up' })
);

router.post('/sign-up', async (req, res, next) => {
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
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/log-in', (req, res) => {
  console.log(req)
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
