exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('first_name', 'last_name', 'email', 'password_digest');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('first_name');
      table.string('last_name');
      table.string('email').unique();
      table.string('password_digest');
    }),
  ]);
};
