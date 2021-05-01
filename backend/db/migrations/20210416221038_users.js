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
    table.string('bio');
    table.json('ratings').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('visionary_categories').nullable();
    table.bigInteger('user_type_id').unsigned().references('id').inTable('user_types').onDelete('CASCADE') // foreign key links user_type by id
    table.string('profile_image').nullable();
    table.json('project_ids').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('connections').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('notifications').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('notification_settings').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('subscription_settings').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.integer('token_version').defaultTo(0);
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


// update tables
// migrate:rollback -> migrate:latest -> seed:run

// run specific file
// knex seed:run --specific=01_users.js
