
const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const isEmail = regex.test('jaybit33@gmail');
console.log(isEmail);


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


// comet
// app id: 291794cd22b09dc
// auth key: 3cf97087bd40473f374fc4daed47f0ebe3137403
// region: us
// rest api key: 7550adcf70e27f56b88bf5e46295aabf32f49403
