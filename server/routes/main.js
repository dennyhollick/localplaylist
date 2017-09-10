const { getArtistTracks, anonTrip } = require('./spotifyHelpers'); // userTrip - need?

const express = require('express');
const trip = require('./trip.js');
const playlist = require('./playlist.js');

const router = express.Router();

function createEventArtists(playlist) {
  if (!playlist || !playlist.eventResponse || !playlist.eventResponse.events) {
    return [];
  }
  return playlist.eventResponse.events.event.filter((event) => {
    return (event && event.performers && event.performers.performer && event.performers.performer.name);
  }).map(event => event.performers.performer.name);
}


module.exports = (knex) => {
  router.post('/trip', (req, res) => {
    // console.log('REQ.USER', req.user);
    anonTrip();

    const {
      saveTrip,
    } = trip(knex);
    const {
      savePlaylist,
    } = playlist(knex);

    const locations = req.body.locations;
    const genres = req.body.genres;

    const categories = genres.length ? genres.map(genre => `music_${genre.toLowerCase()}`).join(',') : 'music';


    const playlistData = locations.map((location) => {
      return {
        name: location.city,
        city: location.city,
        start_date: location.start_date,
        end_date: location.end_date,
      };
    });

    const tripData = {
      name: 'Your trip',
      cookie: req.session.user_cookie,
    };

    const getQuery = city => locations.filter(loc => loc.city === city).map((_location) => {
      _location.categories = categories;
      return _location;
    })[0];

    saveTrip(tripData)
      .then((trip_id) => {
        return Promise.all(playlistData.map((playlist) => {
          return savePlaylist(Object.assign(playlist, {
            trip_id: trip_id[0],
          }), getQuery(playlist.city));
        }));
      })
      .then((concerts) => {
        const artistLists = concerts.map(createEventArtists);
        const playlists = getArtistTracks(artistLists);
        return Promise.all([concerts, playlists])
          .then(([concerts, playlists]) => {
            // knex('playlists').update();
            res.json(concerts.map((concert, index) => Object.assign(
              concert, { playlist: playlists[index] },
            )));
          });
      });
  });

  return router;
};
