const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {
  // Create a new user
  router.post('/new_user', (req, res) => {
    const first_name = req.body.firstname;
    const last_name = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user_cookie = req.session.user_cookie; // cookie
    knex.transaction(() => {
      return knex('users').select('id').where('user_cookie', user_cookie).returning('id')
        .then((users) => {
          if (!users.length) {
            return knex('users').insert({
              user_cookie,
            }).returning('id');
          }

          const id = users[0].id;

          return knex('users').where('id', id).returning('first_name')
            .update({
              first_name,
              last_name,
              email,
              password_digest: hashedPassword,
            })
            .then((name) => {
              res.status(200).send(name);
            })
            .catch((error) => {
              res.status(500).send(error);
            });
        });
    });
  });


  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user_cookie = req.session.user_cookie;
    knex.transaction(() => {
      return knex('users').select('id').where('email', email)
        .then((users) => {
          if (!users.length) {
            return Promise.reject(new Error('user not found!'));
          }
          return knex('users').where('id', users[0].id)
            .then((user) => {
              const password_digest = user[0].password_digest;
              if (!bcrypt.compareSync(password, password_digest)) {
                return Promise.reject(new Error('incorrect password'));
              }
              return knex('users').where('id', user[0].id)
                .update({
                  user_cookie,
                })
                .then(() => {
                  res.status(200).send(JSON.stringify(user[0].first_name));
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            });
        });
    });
  });

  return router;
};
