// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  return knex.schema.createTable('developers', (table) => {
    table.json('roles').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('categories').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.integer('rating');
    table.string('bio');
    table.string('profile_image');
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users'); // foreign key links user by id
  })
};

exports.down = function(knex) {
  knex.schema.dropTables('developers');
};
