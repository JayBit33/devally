// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const visionaries = require('./seed_data/visionaries');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('visionaries').del()
    .then(function () {
      // Inserts seed entries
      return knex('visionaries').insert(visionaries);
    });
};
