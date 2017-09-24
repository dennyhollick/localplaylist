import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates'; //  SingleDatePicker, DayPickerRangeController - need?
import PlacesAutocomplete from 'react-places-autocomplete';
import { updateLocationField, getLocations, addLocationField, removeLocationField } from './actions.js';

// We can force validations for cities via this: https://github.com/kenny-hibino/react-places-autocomplete/issues/106
// My need to update the eventful API to receive geo cordinates. It will make results more accurate
// TODO: Som

class LocationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      start_date: '',
      end_date: '',
      error: null,
    };
  }

  // Changes global state when any of these change in actions
  // Moment converts dateformat to something eventful can use.

  updateField() {
    updateLocationField(this.props.index, this.state.city, moment(this.state.startDate).format('YYYYMMDD'), moment(this.state.endDate).format('YYYYMMDD'));
  }

  render() {
    // Options to configure Autocomplete Cities container. https://github.com/kenny-hibino/react-places-autocomplete

    const options = {
      types: ['(cities)'], // Only render cities in autocomplete. 
    };
    const inputProps = {
      value: this.state.city, // Required props to make this work.
      onChange: city => this.setState({ city }, this.updateField),
      placeholder: 'Destination...',
    };
    const myStyles = {
      autocompleteContainer: { zIndex: 2 }, // Set to 2 so it renders above everything else
    };
    const cssClasses = {
      input: 'form-text-field input',
    };

    // Conditionally render add/remove location buttons 
    const index = this.props.index;
    // const location = getLocations()[index];
    let buttons = null;
    let buttonsDisabled = false;
    if (getLocations()[index].city === '') {
      buttonsDisabled = true;
    }
    if (this.props.index === (getLocations().length) - 1) {
      buttons = (
        <div>
          <button className="button is-primary is-outlined has-text-centered locationButtons" disabled={buttonsDisabled} onClick={() => { addLocationField(); }}>
            <div className="icon">
              <i className="fa fa-plus" />
            </div>
          </button>
          <button className="button is-primary is-outlined has-text-centered locationButtons" onClick={() => { removeLocationField(); }}>
            <div className="icon">
              <i className="fa fa-minus" />
            </div>
          </button>
        </div>
      );
    }

    // Render this...

    return (

      <div className="location-fields">
        <div className="container">{this.state.error} </div>
        <div className="columns">
          <div className="column" />
          <div className="column is-4">
            <div className="field">
              <div className="control">

                {/* Render cities autocomplete - https://github.com/kenny-hibino/react-places-autocomplete */}

                <PlacesAutocomplete
                  inputProps={inputProps}
                  options={options}
                  googleLogo={false}
                  styles={myStyles}
                  highlightFirstSuggestion
                  classNames={cssClasses}
                />
              </div>
            </div>
          </div>
          <div className="column">

            {/* Render datepicker - https://github.com/airbnb/react-dates */}

            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, this.updateField)}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput }, this.updateField)}
              showDefaultInputIcon // Shows calendar icon
              required // Is required
              startDatePlaceholderText={'Arriving'} // Placeholder text
              endDatePlaceholderText={'Departing'}
            />
          </div>
          <div className="column" >

            {/* Render Buttons */}

            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

export default LocationField;
