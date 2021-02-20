// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.bigInteger('creator_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // foreign key links creater by user id
    table.json('team_member_ids').nullable(); // must use JSON.stringify(arraydata) when setting value
    table.string('name');
    table.string('category');
    table.string('description');
    table.boolean('is_public');
    table.boolean('is_seeking_allys').defaultTo(true);
    table.json('hiring_options') // must use JSON.stringify(arraydata) when setting value
    table.json('viewable_regions'); // must use JSON.stringify(arraydata) when setting value
    table.json('funding_types'); // must use JSON.stringify(arraydata) when setting value
    table.boolean('is_featured');
    table.timestamp('date_created').defaultTo(knex.fn.now());

    // table.boolean('ispublic')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('projects');
};

// Region Options: USA, South America, Africa, Asia, Europe
