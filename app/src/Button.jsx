import React, { Component } from 'react';
import { setView, storeFormDataAsync, getLocations } from './actions.js';

class Button extends Component {
  render() {
    let isButton;

    let buttonDisabled = false;
    let err = null;
    const locations = getLocations();

    locations.forEach((location) => {
      if (location.city === '') {
        err = 'There is an empty location! Add a city name or remove the city';
        buttonDisabled = true;
      }
      if (location.start_date === location.end_date) {
        err = 'Please select a date range of at least two days';
        buttonDisabled = true;
      }
    });


    if (this.props.view === 'locations') {
      isButton = <button className="button is-primary is-centred fixed-width-100" disabled={buttonDisabled} onClick={() => { setView('genres'); }}><span>Select Genres</span></button>;
    } else if (this.props.view === 'genres') {
      isButton = <button className="button is-primary is-centred fixed-width-100" disabled={buttonDisabled} onClick={() => { storeFormDataAsync(); }}><span>See your trip!</span></button>;
    } else {
      isButton = <div />;
    }

    return (
      <div className="section">
        <div className="columns">
          <div className="column" />
          <div className="column is-2">
            {isButton}
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}
export default Button;
