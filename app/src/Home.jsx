import React, { Component } from 'react';
import QuestionsContainer from './QuestionsContainer.jsx';
// import { setView } from './actions.js';
import Button from './Button.jsx';
import CitiesResults from './CitiesResults.jsx';
// import ConcertMarquee from './ConcertMarquee.jsx';

class Home extends Component {
  render() {
    const view = this.props.view;

    if (view === 'locations' || view === 'genres') {
      return (
        <div className="section is-large">
          <QuestionsContainer
            view={this.props.view}
            locations={this.props.locations}
            genres={this.props.genres}
          />
          <Button view={this.props.view} />
          {/* <CitiesResults />   */}

        </div>
      );
    } else if (view === 'itinerary') {
      return (
        <div>
          <CitiesResults locations={this.props.locations} concertData={this.props.concertData} />
        </div>
      );
    }
  }
}

export default Home;
