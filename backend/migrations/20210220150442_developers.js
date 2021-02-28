// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  return knex.schema.createTable('developers', (table) => {
    table.json('roles').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('categories').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.string('bio');
    table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE'); // foreign key links user by id
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('developers');
};
