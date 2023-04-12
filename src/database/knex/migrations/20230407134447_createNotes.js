/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable('notes', table => {
  table.increments('id');
  table.text('title');
  table.text('description');
  table.integer('user_id').references('id').inTable('users');
  table.timestamps('created_at').defaultTo(knex.fn.now());
  table.timestamps('updated_at').defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('notes');