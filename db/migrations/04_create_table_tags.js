exports.up = function(knex, Promise) {
  return knex.schema.createTable('tag', function(tbl) {
    tbl.increments();

    tbl
      .string('content')
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tag')
};