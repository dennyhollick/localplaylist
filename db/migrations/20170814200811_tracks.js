exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tracks', (table) => {
      table.increments('id').primary();
      table.string('artist').notNull();
      table.integer('spotify_artist_id');
      table.string('title').notNull();
      table.string('album_name');
      table.string('spotify_track_id');
      table.string('spotify_preview_url');
      table.json('album_images');
      table.integer('track_popularity');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tracks'),
  ]);
};
