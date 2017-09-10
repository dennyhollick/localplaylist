exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('first_name');
      table.string('last_name');
      table.string('email').unique();
      table.string('password_digest');
      table.string('user_cookie').unique();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('first_name', 'last_name', 'email', 'password_digest', 'user_cookie');
      }),
  ]);
};
