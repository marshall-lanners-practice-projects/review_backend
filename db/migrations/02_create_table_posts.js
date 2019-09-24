exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
  	tbl.increments();

  	tbl
  		.string('title')
  		.notNullable()

  	tbl
  		.string('content')
  		.notNullable()

    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')


  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};