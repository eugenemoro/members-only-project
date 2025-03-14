const { body } = require('express-validator');

module.exports = [
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
];
