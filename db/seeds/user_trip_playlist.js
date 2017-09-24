
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { first_name: 'Johnny', last_name: 'Depp', email: 'pirate#1@caribbean.com', password_digest: 'johnnyd' },
        { first_name: 'Jack', last_name: 'Nicholson', email: 'actor#1@hollywood.com', password_digest: 'jackieboy' },
        { first_name: 'Jennifer', last_name: 'Lawrence', email: 'hunger#1@games.com', password_digest: 'nothungryanymore' },
      ])
        .returning('id')
        .then((id) => {
          return knex('trips').insert([
            { name: 'Islands', user_id: id[0] },
            { name: 'Courses', user_id: id[1] },
            { name: 'Forests', user_id: id[2] },
          ])
            .returning('id')
            .then((id) => {
              return knex('playlists').insert([
                { name: 'Haiti', city: 'Port-au-Prince', start_date: 'Sept 2, 2017', end_date: 'Sept 3, 2017', trip_id: id[0] },
                { name: 'Cuba', city: 'Havana', start_date: 'Sept 4, 2017', end_date: 'Sept 5, 2017', trip_id: id[0] },
                { name: 'Jamacia', city: 'Kingston', start_date: 'Sept 6, 2017', end_date: 'Sept 7, 2017', trip_id: id[0] },
                { name: 'Royal County Down', city: 'Newcastle', start_date: 'Sept 8, 2017', end_date: 'Sept 9, 2017', trip_id: id[1] },
                { name: 'Augusta National', city: 'Augusta', start_date: 'Sept 10, 2017', end_date: 'Sept 11, 2017', trip_id: id[1] },
                { name: 'Pine Valley', city: 'Pine Valley', start_date: 'Sept 12, 2017', end_date: 'Sept 13, 2017', trip_id: id[1] },
                { name: 'Cypress Point Club', city: 'Pebble Beach', start_date: 'Sept 14, 2017', end_date: 'Sept 15, 2017', trip_id: id[1] },
                { name: 'Royal Dornoch', city: 'Dornoch', start_date: 'Sept 16, 2017', end_date: 'Sept 17, 2017', trip_id: id[1] },
                { name: 'The Woods', city: 'Forest', start_date: 'Sept 18, 2017', end_date: 'Sept 19, 2017', trip_id: id[2] },
              ]);
            });
        });
    });
};
