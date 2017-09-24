exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('concerts', (table) => {
      table.increments('id').primary();
      table.json('eventful_json').notNull();
      table.integer('playlist_id').unsigned().notNull();
      table.foreign('playlist_id').references('playlists.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('concerts'),
  ]);
};
