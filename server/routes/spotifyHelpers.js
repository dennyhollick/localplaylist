const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirect_uri = 'http://0.0.0.0:3000/callback';

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

const spotifyUserApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

function refreshAccessToken() {
  spotifyUserApi.refreshAccessToken()
    .then((data) => {
      console.log(data.body.access_token);
      return data;
    }, (err) => {
      console.log('ERROR!', err);
    });
}


function anonTrip() {
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      console.log('our spotify info is: ', spotifyApi);
    }, (err) => {
      console.log('something went wrong :( >>> ', err);
      process.exit(-1); // if we don't have a working spotify credentials grant, all is lost.
    });
}

function topThreeTracks(trackList) {
  const artistTracks = trackList.body.tracks;
  const artistTopThree = artistTracks.slice(0, 3);
  return artistTopThree;
}

function getArtistId(artist) {
  return spotifyApi.searchArtists(artist)
    .then((data) => {
      return data.body.artists;
    });
}

function getTopTracks(artistId) {
  return spotifyApi.getArtistTopTracks(artistId, 'CA');
}

function getTopThreeTracksForArtistOrUndefined(artist) {
  return getArtistId(artist)
    .then((artistResults) => {
      if (artistResults.total === 0) {
        return undefined;
      }
      return getTopTracks(artistResults.items[0].id)
        .then(topThreeTracks);
    });
}

function getArtistTracks(ALL) {
  return Promise.all(ALL.map((setOfArtists) => {
    return Promise.all(setOfArtists.map(getTopThreeTracksForArtistOrUndefined))
      .then((data) => {
        return data.filter(artist => artist !== undefined);
      });
  }));
}

// playlist saving


function makePrivatePlaylist(id, accessToken, refreshToken, playlist) {
  spotifyUserApi.setAccessToken(accessToken);
  spotifyUserApi.setRefreshToken(refreshToken);

  spotifyUserApi.createPlaylist(id, 'RoadieSounds Playlist', { public: false })
    .then((data) => {
      return data;
    }, (err) => {
      console.log('Something went wrong!', err);
    })
    .then((data) => {
      spotifyUserApi.addTracksToPlaylist(data.body.owner.id, data.body.id, playlist)
        .then((response) => {
          console.log('Added tracks to playlist!', response);
        }, (err) => {
          console.log('Something went wrong!', err);
        });
    });
}
// //add all tracks here


module.exports = {
  getArtistTracks,
  anonTrip,
  makePrivatePlaylist,
  refreshAccessToken,
};
