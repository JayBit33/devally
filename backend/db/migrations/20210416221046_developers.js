// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  return knex.schema.createTable('developers', (table) => {
    table.increments('id').primary();
    table.json('dev_roles').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('dev_categories').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('dev_skills').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('portfolio').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.string('dev_bio').nullable();
    table.string('dev_github_link').nullable();
    table.string('dev_portfolio_link').nullable();
    table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE'); // foreign key links user by id
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('developers');
};
