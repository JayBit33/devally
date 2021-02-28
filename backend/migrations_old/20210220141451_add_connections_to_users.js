
exports.up = function(knex) {
  knex.schema.table('users', table => {
    table.json('connections').nullable(); // must use JSON.stringify(arraydata) when setting value
  })
};

exports.down = function(knex) {
  knex.schema.table('users', table => {
    table.dropColumn('connections');
  })
};
