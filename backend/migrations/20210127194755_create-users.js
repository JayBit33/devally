
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('firstname');
    table.string('lastname');
    table.bigInteger('user_type_id').unsigned().index().references('id').inTable('user_types');
    table.timestamp('user_since').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};


// create migrations command: knex migrate:make create-tablename
// run migrations command: knex migrate:latest
// create seed for table command: knex seed:make 01_tablename
// run seed command: knex seed:run
