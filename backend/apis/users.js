const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

router.get('/', (req, res) => {
  queries.getAllUsers().then(users => {
    res.json(users);
  })
})

router.get('/query', (req, res) => {
  const { username, rating } = req.query;
  queries.getAllByParam({username, rating}).then(users => {
    res.json(users)
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

router.post('/', (req, res, next) => {
  if (validUser(req.body)) {
    queries.createUser(req.body).then(user => {
      res.send(user[0]);
    })
  } else {
    next(new Error('Invalid User Data'));
  }
})

router.get('/dev-accounts', (req, res) => {
  queries.getDevUsers().then(users => {
    res.send(users);
  })
})

router.get('/customers', (req, res) => {
  queries.getCustomers().then(users => {
    res.json(users);
  })
})

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/:id', isValidId, (req, res, next) => {
  queries.getUserById(req.params.id).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      next(new Error('User Does Not Exist'))
    }
  })
})

router.put('/:id', isValidId, (req, res, next) => {
  queries.updateUserById(req.params.id, req.body).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      next(new Error('User Does Not Exist'))
    }
  })
})

router.delete('/:id', isValidId, (req, res, next) => {
  queries.deleteUserById(req.params.id).then(() => {
    res.json({
      deleted: true
    })
  })
})

// Any route below this point will error out "Invalid Id"

module.exports = router;
