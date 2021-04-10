// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import express from 'express';
import bcrypt from 'bcrypt';
import { createAccessToken, createJRTEM } from './utils/authorization';
import users from '../db/user-queries';
const router = express.Router();
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

/**
 * @swagger
 * auth/signup:
 *   post:
 *     summary: Retrieve a list of users by a given parameter
 *     description: Retrieve a list of users
 *     tags: [{ 'name': 'Auth'}]
 *     parameters:
   *       - name: username
   *         description: User's username.
   *         in: body
   *         required: true
   *         type: string
   *         example: 'jbit33'
   *       - name: password
   *         description: User's password.
   *         in: body
   *         required: true
   *         type: string
   *         example: 'password123'
 *     responses:
 *       200:
 *         description: signup for devally.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID for the newly created user.
 *                     example: 0
 *                   message:
 *                     type: string
 *                     example: 'user successfully created'
 *       400:
 *         description: newly created user account failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     example: 'Email is taken'
 *
*/
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
        return res.status(422).json({
          message: 'Email is taken'
        });
      }
    })
  } else {
    next(new Error('Invalid user info'))
  }
});

/**
 * @swagger
 * auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     tags: [{ 'name': 'Auth'}]
 *     parameters:
 *       - name: username
 *         description: User's username
 *         required: true
 *         in: body
 *         type: string
 *         example: 'jaybit33'
 *       - name: password
 *         description: User's password.
 *         in: body
 *         required: true
 *         type: string
 *         example: 'password123'
 *     responses:
 *       200:
 *         description: login to devally.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   result:
 *                     type: boolean
 *                     description: Whether login was succesfull or not
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: 'login successfull'
 *                   user:
 *                     example:
 *                         id: 0
 *                         username: 'bossman'
 *                         email: 'bossman@devally.com'
 *                         firstname: 'Boss'
 *                         lastname: 'Man'
 *                         user_type_id: 2
 *                         profile_image: 'profile39012.png'
 *                         connections: [1,3,21]
 *                         notification_settings: { messages: true, added_connection: true, project_invitation: true }
 *                         subscription_settings: { featured_projects: true, weekly_news: true, updates: true }
 *       400:
 *         description: newly created user account failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     example: 'Incorrect Password'
 *
*/
router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    users.getAllByParam({email: req.body.email})
      .then(user => {
        if (!user) res.status(401).json({ message: 'Auth failed'})
        bcrypt.compare(req.body.password, user.password)
          .then(result => {
            if (result) {
              const accessToken = createAccessToken(user)
              res.cookie('jrtem', createJRTEM(user),
              {
                httpOnly: true,
                secure: req.app.get('env') != 'development',
                signed: true
              });
              res.status(200).json({ result, message: 'Auth successful', user: user, accessToken})
            }
            else res.json({ message: 'Incorrect password'})
          })
      })
  } else {
    next(new Error('input not valid'))
  }
});

module.exports = router;
