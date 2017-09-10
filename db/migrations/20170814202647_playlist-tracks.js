exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('playlist-tracks', (table) => {
      table.integer('playlist_id').unsigned().notNull();
      table.foreign('playlist_id').references('playlists.id');
      table.integer('track_id').unsigned().notNull();
      table.foreign('track_id').references('tracks.id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('playlist-tracks'),
  ]);
};
