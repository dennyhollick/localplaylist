import React, { Component } from 'react';
import { updateGenreField } from './actions.js';

const shortid = require('shortid');

class GenreSelect extends Component {
  render() {
    // Props and constants 

    const genres = this.props.genres;

    // TODO: Update Icons to be more appropriate...

    const genreObjects = [
      {
        genre: 'rock',
        icon: 'fa fa-hand-rock-o',
      },
      {
        genre: 'pop',
        icon: 'fa fa-thumbs-o-up',
      },
      {
        genre: 'hip-hop',
        icon: 'fa fa-music',
      },
      {
        genre: 'indie',
        icon: 'fa fa-motorcycle',
      },
      {
        genre: 'world',
        icon: 'fa fa-globe',
      },
      {
        genre: 'eletronic',
        icon: 'fa fa-bolt',
      },
      {
        genre: 'classical',
        icon: 'fa fa-ticket',
      },
      {
        genre: 'country',
        icon: 'fa fa-star',
      },
      {
        genre: 'folk',
        icon: 'fa fa-signing',
      },
      {
        genre: 'latin',
        icon: 'fa fa-thermometer-full',
      },
      {
        genre: 'r&b',
        icon: 'fa fa-heart',
      },
      {
        genre: 'metal',
        icon: 'fa fa-trash',
      },

    ];

    // Sorts Genres Alphabetically

    genreObjects.sort((a, b) => {
      if (a.genre < b.genre) return -1;
      if (a.genre > b.genre) return 1;
      return 0;
    });

    // Maps all Genre objects above.
    // Once clicked, will toggle state of Genre 
    // If genre state is set, will render button as 'active'

    const genreSelector = genreObjects.map((item) => {
      let buttonClass = 'button is-primary fixed-width-100';
      if (genres.indexOf(item.genre) > -1) {
        buttonClass += ' is-active';
      }
      return (<div key={shortid.generate()} className="column is-one-quarter is-capitalized">
        {/* eslint-disable jsx-a11y/interactive-supports-focus */}
        <div
          className={buttonClass}
          role="button"
          onClick={() => {
            updateGenreField(item.genre);
          }}
        >
          {/* eslint-enable */}
          <span className="icon is-small">
            <i className={item.icon} />
          </span>
          <span>{item.genre}</span>
        </div>
      </div>
      );
    });

    // Render above buttons

    return (
      <div className="container animated bounceInRight">
        <h2 className="subtitle has-text-centered is-size-2 has-text-white-bis">Select your favourite genres</h2>
        <div className="columns">
          <div className="column is-2" />
          <div className="column is-8">
            <div className="columns is-multiline">
              {genreSelector}
            </div>
          </div>
          <div className="column is-2" />
        </div>
      </div>
    );
  }
}
export default GenreSelect;
