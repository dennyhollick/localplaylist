
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trips', (table) => {
      table.increments('id').primary();
      table.string('name').notNull();
      table.integer('user_id').unsigned().notNull();
      table.foreign('user_id').references('users.id');
      table.timestamps();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trips'),
  ]);
};
