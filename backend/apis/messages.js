// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
const express = require('express');
const queries = require('../db/queries/user-queries');
const router = express.Router();

// Fake route to test accessToken
router.get('/newest-messages', (_, res) => {
  res.json([
    {
      senderId: 11,
      dateSent: new Date(2021, 4, 8, 8, 29, 0, 0),
      message: 'Designs are coming along. Should have them to you by noon today'
    },
    {
      senderId: 18,
      dateSent: new Date(2021, 4, 8, 4, 41, 0, 0),
      message: 'If you could add me to the slack channel, my email ironman@iron.com'
    },
    {
      senderId: 3,
      dateSent: new Date(2021, 4, 7, 11, 38, 0, 0),
      message: 'I am interested in hearing more about your project.'
    },
    {
      senderId: 12,
      dateSent: new Date(2021, 4, 5, 9, 12, 0, 0),
      message: 'Yes, I would like to join your team as a graphic designer!'
    }
  ])
})


module.exports = router;
