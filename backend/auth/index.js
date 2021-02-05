const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = require('../db/user-queries');
const { user } = require('../test/fixtures')

router.get('/', (req, res) => {
  res.json({
    message: 'AUTHORIZATION! MUST SHOW CREDENTIALS'
  });
});

function validUser(user) {
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const isValidEmail = typeof user.email == 'string' && user.email.trim() != '' && regex.test(user.email);
  const isValidPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.length >= 5
  return isValidEmail && isValidPassword
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    users.getAllByParam({email: req.body.email}).then(user => {
      if (!user) {
        // yay, this email is unique. hash password and add new user to db!
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const newUser = { ...req.body, password: hash }
            users.createUser(newUser).then(user => {
              res.json({
                userId: user.id,
                message: 'user successfully created'
              })
            })
          })
      } else {
        next(new Error('Email is taken'))
      }
    })
  } else {
    next(new Error('Invalid user'))
  }
});

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    users.getAllByParam({email: req.body.email})
      .then(user => {
        if (!user) res.json({ message: 'User with email does not exist'})
        bcrypt.compare(req.body.password, user.password)
          .then((result => {
            if (result) {
              res.cookie('user_id', user.id, {
                httpOnly: true,
                secure: req.app.get('env') != 'development',
                signed: true
              });
              res.status(200).json({ result, message: 'login successful', user: user})
            }
            else res.json({ message: 'Incorrect password'})
          }))
      })
  } else {
    next(new Error('input not valid'))
  }
})

module.exports = router;
