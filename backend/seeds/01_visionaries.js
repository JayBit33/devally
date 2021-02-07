import visionaries from './seed_data/visionaries';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('visionaries').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert(visionaries);
    });
};
