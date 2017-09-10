import React, { Component } from 'react';
import LocationsList from './LocationsList.jsx';
// import { setView } from './actions.js';
import GenresSelect from './GenreSelect.jsx';
// import Button from './Button.jsx';

class QuestionsContainer extends Component {
  render() {
    let currentView;
    switch (this.props.view) {
      case 'locations':
        currentView = <LocationsList locations={this.props.locations} />;
        break;
      case 'genres':
        currentView = <GenresSelect genres={this.props.genres} />;
        break;
      default:
        currentView = <LocationsList locations={this.props.locations} />;
        break;
    }

    return (
      <div>
        {currentView}
      </div>
    );
  }
}

export default QuestionsContainer;
