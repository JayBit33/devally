
exports.up = function(knex) {
  knex.schema.createTable('visionaries', table => {
    table.increments('id').primary();
    // ???????

    // table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    // table.integer('rating');
    // table.string('profile_image');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('visionaries');
};
