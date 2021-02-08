// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

import projects from './seed_data/projects';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert(projects);
    });
};
