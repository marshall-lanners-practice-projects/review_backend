exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
    tbl.increments();

    tbl
      .string('tag_name')
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags')
};