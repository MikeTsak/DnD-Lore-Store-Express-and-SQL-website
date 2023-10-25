exports.up = function(knex) {
    return knex.schema.createTable('lore', table => {
      table.increments('id').primary();
      table.string('title');
      table.text('content');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('lore');
  };
  