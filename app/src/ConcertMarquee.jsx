import React, { Component } from 'react';
import ConcertCard from './ConcertCard.jsx';
import { updateConcertIndex, getConcerts, getConcertViewIndex } from './actions.js';

const shortid = require('shortid');

class ConcertMarquee extends Component {
  // TODO: Concert index state needs to be held within the component or it will affect other ones.

  render() {
    const playlistNumber = this.props.index;
    const ConcertObjNum = playlistNumber; // if concerts > 1 Obj, needs to match right list work

    const concertData = getConcerts();
    // const playlistData = concertData[ConcertObjNum];
    const events = concertData[ConcertObjNum].eventResponse.events.event;


    const concertViewIndex = getConcertViewIndex();


    const maxInView = 3;
    const start = concertViewIndex % events.length;
    const end = start + maxInView;

    const concerts = events
      .slice(start, end)
      .concat(events.slice(0, Math.max(0, end - events.length)))
      .map((event) => {
        return (
          <ConcertCard
            key={shortid.generate()}
            concert={event}
          />);
      });

    const numberOfPages = Math.ceil(events.length / maxInView);
    const currentPage = (Math.floor(start / maxInView) + 1);

    return (
      <div className="section is-marginless animated fadeIn no-padding-left-right">
        <div className="container animated fadeIn">
          <div className="columns">
            {/* <div className="column is-1" /> */}
            <div className="column">
              <div className="columns concert-scroller">
                {concerts}
              </div>
            </div>
            {/* <div className="column is-1" /> */}
          </div>
          <div className="has-text-centered">
            <span className="icon icon-colour-green">
              <i
                className="fa fa-chevron-left"
                aria-hidden="true"
                role="button"
                onClick={() => {
                  updateConcertIndex(-1, events.length);
                }}
              />
            </span>
            <span>{currentPage}/{numberOfPages}</span>
            <span className="icon icon-colour-green">
              <i
                className="fa fa-chevron-right"
                aria-hidden="true"
                role="button"
                onClick={() => {
                  updateConcertIndex(1, events.length);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcertMarquee;
