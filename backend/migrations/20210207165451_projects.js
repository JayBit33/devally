// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increment('id').primary();
    table.bigInteger('creator_id').unsigned().index().references('id').inTable('users'); // foreign key links creater by user id
    table.json('team_member_ids').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.string('name');
    table.string('category');
    table.string('description');
    table.json('hiring_options').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.json('viewable_regions'); // must use JSON.stringify(arraydata) when setting value
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('projects');
};

// Region Options: USA, South America, Africa, Asia, Europe
