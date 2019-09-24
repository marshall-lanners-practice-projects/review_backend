exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts_tags', function(tbl) {
  	tbl.increments();

	  tbl
  		.integer('post_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('posts')

  	tbl
  		.integer('tag_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('tags')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts_tags')
};