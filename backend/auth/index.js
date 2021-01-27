const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'AUTHORIZATION! MUST SHOW CREDENTIALS'
  });
});

router.post('/signup', (req, res) => {
  res.json({
    message: '🐱'
  })
})

module.exports = router;
