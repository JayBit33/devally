// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const bcrypt = require('bcrypt');
const password = 'password';
const hash = bcrypt.hashSync(password, 10);

module.exports = [
  {
    username: 'jeb',
    email: 'jeb352@gmail.com',
    password: password,
    firstname: 'Jeb',
    lastname: 'Eichs',
    user_type_id: 1
  },
  {
    username: 'jen38950',
    email: 'jen@gmail.com',
    password: password,
    firstname: 'Jen',
    lastname: 'Smith',
    user_type_id: 1
  },
  {
    username: 'beny89',
    email: 'beny89@gmail.com',
    password: password,
    firstname: 'Ben',
    lastname: 'Antoitte',
    user_type_id: 1
  },
  {
    username: 'appmaker',
    email: 'appmaker@gmail.com',
    password: password,
    firstname: 'Ben',
    lastname: 'Hill',
    user_type_id: 1
  },
  {
    username: 'waveybits',
    email: 'waveybits@gmail.com',
    password: password,
    firstname: 'Wavey',
    lastname: 'Boseman',
    user_type_id: 3
  },
  {
    username: 'bossman',
    email: 'boss@devally.com',
    password: password,
    firsname: 'Boss',
    lastname: 'Man',
    user_type_id: 3
  }

]
