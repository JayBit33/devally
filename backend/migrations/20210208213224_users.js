// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('firstname');
    table.string('lastname');
    table.bigInteger('user_type_id').unsigned().references('id').inTable('user_types').onDelete('CASCADE') // foreign key links user_type by id
    table.string('profile_image').nullable();
    table.timestamp('user_since').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};


// WHEN RUNNING LATEST MIGRATIONS AND RUNNING SEEDS ORDER MATTERS!!!!!!!! SINCE USERS HAS USER_TYPE_ID USER_TYPES TABLE MIGRATION MUST BE MADE FIRST!
// create migrations command: knex migrate:make create-tablename
// run migrations command: knex migrate:latest
// create seed for table command: knex seed:make 01_tablename
// run seed command: knex seed:run
