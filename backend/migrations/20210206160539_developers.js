
exports.up = function(knex) {
  return knex.schema.createTable('developers', (table) => {
    table.json('roles').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('technologies').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.integer('rating');
    table.string('profile_image');
  })
};

exports.down = function(knex) {
  knex.schema.dropTables('developers');
};
