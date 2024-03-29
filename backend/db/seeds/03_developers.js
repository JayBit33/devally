// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const developers = require('./seed_data/developers');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('developers').del()
    .then(function () {
      // Inserts seed entries
      return knex('developers').insert(developers);
    });
};
