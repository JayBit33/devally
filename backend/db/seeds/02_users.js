// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const users = require('./seed_data/users');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};

// create seed for table command: knex seed:make 01_tablename
// run seed command: knex seed:run
