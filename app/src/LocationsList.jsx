import React, { Component } from 'react';
import LocationField from './LocationField.jsx';


class LocationsList extends Component {
  render() {
    // Passes in empty location data to render form input fields
    const locations = this.props.locations.map((location, index) => {
      return (
        <LocationField
          key={index}
          index={index}
          city={location.city}
          start_date={location.start_date}
          end_date={location.end_date}
        />);
    });
    return (
      <div className="locationsContainer container">
        <h2 className="subtitle has-text-centered is-size-2 has-text-white-bis">Where are you travelling to?</h2>
        {/* Render location input fields */}
        {locations}
      </div>
    );
  }
}
export default LocationsList;
