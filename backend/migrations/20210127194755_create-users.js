
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('firstname');
    table.string('lastname');
    table.json('account_types'); // must use JSON.stringify(arraydata) when setting value
    table.json('skills').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.integer('rating');
    table.timestamp('user_since').defaultTo(knex.fn.now());
    table.string('profile_image');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};


// create migrations command: knex migrate:make create-tablename
// run migrations command: knex migrate:latest
// create seed for table command: knex seed:make 01_tablename
// run seed command: knex seed:run
