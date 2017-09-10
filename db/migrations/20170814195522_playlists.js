exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('playlists', (table) => {
      table.increments('id').primary();
      table.string('name').notNull();
      table.string('city').notNull();
      table.timestamp('start_date').notNull();
      table.timestamp('end_date').notNull();
      table.integer('trip_id').unsigned().notNull();
      table.foreign('trip_id').references('trips.id');
      table.timestamps();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('playlists'),
  ]);
};
