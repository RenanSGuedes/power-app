
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.text('username').unique().notNullable()
    table.text('user_city').notNullable()
    table.text('user_state').notNullable()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    table.text('report').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};