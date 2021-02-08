// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  knex.schema.createTable('visionaries', table => {
    table.increments('id').primary();
    table.json('categories'); // must use JSON.stringify(arraydata) when setting value
    table.string('bio');
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users'); // foreign key links user by id
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('visionaries');
};
