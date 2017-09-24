const express = require('express');
// const expressSession = require('express-session');

const router = express.Router();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { makePrivatePlaylist } = require('./spotifyHelpers');

require('dotenv').config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://0.0.0.0:3000/callback';

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/spotify-userAuth');
//   next();
// }

// Spotify Web Node module
module.exports = (knex) => {
  passport.serializeUser((user, done) => {
    // console.log('serializeeeeeee', user);
    done(null, user.spotify_id);
  });

  passport.deserializeUser((spotify_id, done) => {
    // console.log(spotify_id);
    knex('users').where('spotify_id', spotify_id)
      .then((users) => {
        // console.log('deeeeserralizeeeeee', users[0]);
        done(null, users[0]);
      });
  });

  passport.use(new SpotifyStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri,
  },
  (accessToken, refreshToken, profile, done) => {
    return knex('users').where('spotify_id', profile.id)
      .insert({
        first_name: profile.displayName,
        spotify_id: profile.id,
        access_token: accessToken,
        refresh_token: refreshToken,
      }).returning('*')
      .then((users) => {
        return done(null, users[0]);
      });
  }));


  router.get('/spotify-userAuth',
    passport.authenticate('spotify', {
      scope: ['user-read-private', 'playlist-modify-private'],
      showDialog: true,
      display: 'popup',
    }));

  router.get('/callback',
    passport.authenticate('spotify', {
      // successRedirect: '/',
      failureRedirect: '/',
    }),
    (req, res) => {
      res.status(204).send();
    });

  // router.use(ensureAuthenticated);

  router.get('/current-user', (req, res) => {
    res.json(req.user);
  });

  router.post('/save-playlist', (req, res) => {
    const userPlaylist = req.body.cityPlaylist;
    const songIds = userPlaylist.map((song) => {
      return `spotify:track:${song.id}`;
    });
    makePrivatePlaylist(
      req.user.spotify_id,
      req.user.access_token,
      req.user.refresh_token, songIds);
    res.status(200).send();
  });

  return router;
};
