// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import express from 'express';
import authChecker from './middelware/auth-checker';
import queries from '../db/user-queries';
const router = express.Router();

// Fake route to test accessToken
router.get('/test', authChecker, (req, res) => {
  console.log('user data', req.userData)
  res.json({
    message: 'access granted'
  })
})

// Replace with query.
router.get('/notifications', (res) => {
  res.json({
    notifications: [ {
      senderId: 4,
      projectId: null,
      message: 'Added you as a connection'
    },
    {
      senderId: 12,
      projectId: 4,
      message: 'Recieved a project invitation'
    }]
  })
})

/**
 * @swagger
 * /api/v1/users/query:
 *   get:
 *     summary: Retrieve a list of users by a given parameter
 *     description: Retrieve a list of users
 *     tags: [{ 'name': 'Users'}]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 0
 *                   username:
 *                     type: string
 *                     example: 'bossman'
 *                   email:
 *                     type: string
 *                     example: 'bossman@devally.com'
 *                   firstname:
 *                     type: string
 *                     example: 'Boss'
 *                   lastname:
 *                     type: string
 *                     example: 'Man'
 *                   user_type_id:
 *                     type: integer
 *                     example: 1
 *                   profile_image:
 *                     type: string
 *                     example: 'profile12351.png'
 *                   connections:
 *                     type: array
 *                     example: [1,3,21]
 *                   notification_settings:
 *                     type: object
 *                     example: { messages: true, added_connection: true, project_invitation: true }
 *                   subscription_settings:
 *                     type: object
 *                     example: { featured_projects: true, weekly_news: true, updates: true }
*/
router.get('/query', (req, res) => {
  const { username, rating } = req.query;
  queries.getAllByParam({username, rating}).then(users => {
    res.json(users)
    res.send(200)
  }).catch(error => {
    console.log(error)
    res.send(500)
  })
})

function validUser(user) {
  const hasUsername = typeof user.username == 'string' && user.username.trim() != '';
  const hasPassword = typeof user.password == 'string' && user.password.trim() != '';
  const hasFirstname = typeof user.firstname == 'string' && user.firstname.trim() != '';
  const hasLastname = typeof user.lastname == 'string' && user.lastname.trim() != '';
  // const hasAccountTypes = user.account_types.length > 0;
  // const hasSkills = user.skills.length > 0;
  // const hasHiringOptions = user.hiring_options.length > 0;
  return hasUsername && hasPassword && hasFirstname && hasLastname;
}

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags: [{ 'name': 'Users'}]
 *     responses:
 *       200:
 *         description: User data that was created.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 0
 *                   username:
 *                     type: string
 *                     example: 'bossman'
 *                   email:
 *                     type: string
 *                     example: 'bossman@devally.com'
 *                   firstname:
 *                     type: string
 *                     example: 'Boss'
 *                   lastname:
 *                     type: string
 *                     example: 'Man'
 *                   user_type_id:
 *                     type: integer
 *                     example: 1
 *                   profile_image:
 *                     type: string
 *                     example: 'profile12351.png'
 *                   connections:
 *                     type: array
 *                     example: [1,3,21]
 *                   notification_settings:
 *                     type: object
 *                     example: { messages: true, added_connection: true, project_invitation: true }
 *                   subscription_settings:
 *                     type: object
 *                     example: { featured_projects: true, weekly_news: true, updates: true }
*/
router.post('/create', (req, res, next) => {
  if (validUser(req.body)) {
    queries.createUser(req.body).then(user => {
      res.status(201).send(user[0]);
    })
  } else {
    next(new Error('Invalid User Data'));
  }
})

/**
 * @swagger
 * /api/v1/users/devs:
 *   get:
 *     summary: Retrieve all dev users
 *     description: Retrieve all users that are listed as developer accounts
 *     tags: [{ 'name': 'Users'}]
 *     responses:
 *       200:
 *         description: A list of users with account type of developer.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 0
 *                   username:
 *                     type: string
 *                     example: 'bossman'
 *                   email:
 *                     type: string
 *                     example: 'bossman@devally.com'
 *                   firstname:
 *                     type: string
 *                     example: 'Boss'
 *                   lastname:
 *                     type: string
 *                     example: 'Man'
 *                   user_type_id:
 *                     type: integer
 *                     example: 1
 *                   profile_image:
 *                     type: string
 *                     example: 'profile12351.png'
 *                   connections:
 *                     type: array
 *                     example: [1,3,21]
 *                   notification_settings:
 *                     type: object
 *                     example: { messages: true, added_connection: true, project_invitation: true }
 *                   subscription_settings:
 *                     type: object
 *                     example: { featured_projects: true, weekly_news: true, updates: true }
*/
router.get('/devs', (req, res) => {
  queries.getDevUsers().then(users => {
    res.status(200).send(users);
  })
})

/**
 * @swagger
 * /api/v1/users/visionaries:
 *   get:
 *     summary: Retrieve all visionary users
 *     description: Retrieve all users that are listed as visionary accounts
 *     tags: [{ 'name': 'Users'}]
 *     responses:
 *       200:
 *         description: A list of users with account type of visionary.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 0
 *                   username:
 *                     type: string
 *                     example: 'bossman'
 *                   email:
 *                     type: string
 *                     example: 'bossman@devally.com'
 *                   firstname:
 *                     type: string
 *                     example: 'Boss'
 *                   lastname:
 *                     type: string
 *                     example: 'Man'
 *                   user_type_id:
 *                     type: integer
 *                     example: 1
 *                   profile_image:
 *                     type: string
 *                     example: 'profile12351.png'
 *                   connections:
 *                     type: array
 *                     example: [1,3,21]
 *                   notification_settings:
 *                     type: object
 *                     example: { messages: true, added_connection: true, project_invitation: true }
 *                   subscription_settings:
 *                     type: object
 *                     example: { featured_projects: true, weekly_news: true, updates: true }
*/
router.get('/visionaries', (req, res) => {
  queries.getCustomers().then(users => {
    res.status(200).json(users);
  })
})

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

/**
 * @swagger
 * /api/v1/users/:id:
 *   get:
 *     summary: Retrieve user by id
 *     description: Retrieve single user by id
 *     tags: [{ 'name': 'Users'}]
 *     parameters:
 *       - id: 3
 *         description: User's id
 *         required: true
 *         in: params
 *         type: Number
 *         example: 3
 *     responses:
 *       200:
 *         description: User with matching id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       username:
 *                         type: string
 *                         example: 'bossman'
 *                       email:
 *                         type: string
 *                         example: 'bossman@devally.com'
 *                       firstname:
 *                         type: string
 *                         example: 'Boss'
 *                       lastname:
 *                         type: string
 *                         example: 'Man'
 *                       user_type_id:
 *                         type: integer
 *                         example: 1
 *                       profile_image:
 *                         type: string
 *                         example: 'profile12351.png'
 *                       connections:
 *                         type: array
 *                         example: [1,3,21]
 *                       notification_settings:
 *                         type: object
 *                         example: { messages: true, added_connection: true, project_invitation: true }
 *                       subscription_settings:
 *                         type: object
 *                         example: { featured_projects: true, weekly_news: true, updates: true }
*/
router.get('/:id', isValidId, (req, res, next) => {
  queries.getUserById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      console.log('no user')
      res.status(404);
      next(new Error('User Does Not Exist'))
    }
  })
})

/**
 * @swagger
 * /api/v1/users/:id:
 *   put:
 *     summary: Update user record by user id
 *     description: Update user record by user id
 *     tags: [{ 'name': 'Users'}]
 *     parameters:
 *       - id: 3
 *         description: User's id
 *         required: true
 *         in: params
 *         type: Number
 *         example: 34
*/
router.put('/:id', isValidId, (req, res, next) => {
  queries.updateUserById(req.params.id, req.body).then(user => {
    if (user) {
      res.status(204).json(user);
    } else {
      res.status(404);
      next(new Error('User Does Not Exist'))
    }
  })
})

// TODO
// router.put('/update/:id', isValidId, (req, res) => {
//   console.log(req)
//   queries.updateByUserType(req.params.id, req.body.userTypeId, req.body.data).then(res => {
//     if (res) {
//       res.json(res)
//     } else {
//       res.status(404);
//       next(new Error('User Does Not Exist'))
//     }
//   })
// })

/**
 * @swagger
 * /api/v1/users/:id:
 *   delete:
 *     summary: Delete user record by user id
 *     description: Delete a user
 *     tags: [{ 'name': 'Users'}]
 *     parameters:
 *       - name: id
 *         description: User's id
 *         required: true
 *         in: params
 *         type: Number
 *         example: 34
 *       - name: token
 *         description: user auth token
 *         required: true
 *         in: headers
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhdmV5Yml0c0BnbWFpbC5jb20iLCJ1c2VySWQiOjUsImlhdCI6MTYxODAxMDk3NCwiZXhwIjoxNjE4MDE0NTc0fQ.REKKslAtHUu4kF_kLgdjNKxFpBaQw2NyU7byjOefuYA
*/
router.delete('/:id', authChecker, isValidId, (req, res, next) => {
  queries.deleteUserById(req.params.id).then(() => {
    res.status(202).json({
      deleted: true
    })
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

// Use to revoke users refresh tokens
router.put('/revoke/:id', (req, res) => {
  queries.revokeRefreshToken(req.params.id).then(() => {
    res.status(202).json({
      revoked: true
    })
  })
})

// router.get('/', (req, res) => {
//   queries.getAllUsers().then(users => {
//     res.json(users);
//   })
// })

// Any route below this point will error out "Invalid Id"

module.exports = router;
