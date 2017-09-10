// import React from 'react';
// import { render } from 'react-dom';
// import App from './App.jsx';
import { setState } from './appState';

// Fake concert data as per API. 
// Remove?

// const fakeData = require('./fakedata.js');
// const concertData = fakeData.concerts;


require('../styles/application.scss');

if (module.hot) {
  module.hot.accept();
}

setState({
  view: 'locations',
  user: null,
  locations: [{ city: '', start_date: '', end_date: '' }],
  genres: [],
  concerts: [],
  concerts_view_index: 0,
  songs: [],
  loading: false,
});
