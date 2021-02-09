// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const projects = require('./seed_data/projects');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert(projects);
    });
};
