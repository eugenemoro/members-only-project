const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const signUpValidator = require('../validators/signUpValidator');
const authValidator = require('../validators/authValidator');
const passport = require('passport');
const bcrypt = require('bcrypt');


router.get('/', indexController.getHome);

router.get('/sign-up', indexController.getSignUp);

router.post(
  '/sign-up',
  signUpValidator,
  indexController.postSignUp
);

router.get('/log-in', indexController.getLogin);

router.post('/log-in', 
  passport.authenticate('local', {
      successRedirect: '/messages',
      failureRedirect: '/log-in',
      failureFlash: true,
  })
);

router.get('/log-out', indexController.getLogout);

router.get(
  '/membership',
  authValidator,
  indexController.getMembership
);

router.post('/membership', indexController.postMembership);

module.exports = router;
