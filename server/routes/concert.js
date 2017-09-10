const rp = require('request-promise');
const querystring = require('querystring');
require('dotenv').config();

module.exports = knex => ({

  getConcertData: (id, query, playlistData) => {
    return new Promise((resolve, reject) => {
      let apiResponse = '';

      const modifiedQuery = {
        location: query.city,
        categories: query.categories,
        date: `${query.start_date}00-${query.end_date}00`,
        page_size: 25,
      };

      const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_APP_KEY}&${querystring.stringify(modifiedQuery)}`;
      rp.get(url)
        .then((response) => {
          let counter = 0;

          while (!response) {
            counter += 1;
            if (counter > 5) {
              return Promise.reject(new Error('incorrect password'));
            }
            return rp.get(url);
          }

          return response;
        })
        .then((response) => {
          apiResponse += response.toString();
          const eventResponse = JSON.parse(apiResponse);
          return knex('concerts').insert({
            eventful_json: eventResponse,
            playlist_id: id,
          }).then(() => {
            return resolve(Object.assign(playlistData, { eventResponse }));
          })
            .catch((error) => {
              return resolve('Error', error);
            });
        })
        .catch((error) => {
          return resolve('Error', error);
        });
    });
  },

});
