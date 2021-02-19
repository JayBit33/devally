// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const userTypes = require('./seed_data/userTypes');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_types').insert(userTypes);
    });
};