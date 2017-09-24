import React, { Component } from 'react';
import CityCard from './CityCard.jsx';
import { getConcerts } from './actions.js';

const shortid = require('shortid');

class CitiesResults extends Component {
  render() {
    const returnedQuery = getConcerts();


    const trips = returnedQuery.map((locations, index) => {
      return (<CityCard key={shortid.generate()} trip={locations} index={index} />);
    });

    return (
      <section className="cities-results animated fadeIn">
        <div className="hero is-small is-primary is-bold">
          <div className="hero-body animated bounceInRight">
            <h2 className="title has-text-centered"> Your Trip </h2>
          </div>
        </div>
        <div className="container min-height">
          {trips}
          <div className="section is-small has-text-centered animated bounceInRight">
            <div className="icon">
              <i className="fa fa-thumbs-o-up has-text-primary is-size-1" aria-hidden="true" />
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default CitiesResults;
