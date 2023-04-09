exports.up = knex => knex.schema.createTable('notes', table =>  {
  
  table.increments('id');
  table.text('title');
  table.text('description');
  table.integer('user_id').references('id').inTable('users');
  table.timestamps('created_at').defaulntTo(knex.fn.now());
  table.timestamps('updated_at').defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable('notes', table =>  {

});