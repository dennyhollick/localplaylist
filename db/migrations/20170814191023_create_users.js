
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNull();
      table.string('last_name').notNull();
      table.string('email').unique().notNull();
      table.string('password_digest').notNull();
      table.string('spotify_id').nullable();
      table.timestamps();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ]);
};
