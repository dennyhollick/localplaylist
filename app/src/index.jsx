require('../styles/main.scss');
import {setState}  from './appState';

if(module.hot) {
  module.hot.accept();
}

setState({
  view: '',
  user: null,
  locations: [],
  genres: [],
  concerts: [],
  songs: [],
});