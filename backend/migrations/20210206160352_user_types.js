
exports.up = function(knex) {
  return knex.schema.createTable('user_types', (table) => {
    table.increments('id').primary();
    table.string('type')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('user_types');
};
