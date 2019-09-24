exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(tbl) {
  	tbl.increments();

  	tbl
  		.string('content')
  		.notNullable()

  	tbl
  		.integer('post_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('posts')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};