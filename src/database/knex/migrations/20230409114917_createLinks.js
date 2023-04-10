/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

  knex.schema.createTable('links', table => {
    table.increments('id');
    table.text('url').notNullable();
    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE');
    table.timestamps('created_at').defaultTo(knex.fn.now());
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('links');
};