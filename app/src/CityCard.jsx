import React, { Component } from 'react';
import moment from 'moment';
import ConcertMarquee from './ConcertMarquee.jsx';
import Playlist from './Playlist.jsx';

class CityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unrolled: false,
    };
  }

  render() {
    const trip = this.props.trip;
    const index = this.props.index;
    const boxClass = 'box is-primary is-outlined';
    const startDate = moment(trip.start_date).format('ll');
    const endDate = moment(trip.end_date).format('ll');

    return (
      <div>
        <div className="add-padding-top-bottom animated bounceInRight">
          <box
            className={boxClass}
            onClick={() => { this.setState({ unrolled: !this.state.unrolled }); }}
          >
            <div className="columns">
              <div className="column is-1">
                <span className="icon has-text-primary">
                  <i className="fa fa-angle-down" />
                </span>
              </div>
              <div className="column is-8">
                <span>{trip.city}</span>
              </div>
              <div className="column has-text-right">
                <span>{startDate} - {endDate}</span>
              </div>
            </div>
          </box>
        </div>
        {(this.state.unrolled ? (
          <div>
            <ConcertMarquee trip={trip} index={index} />
            <Playlist trip={trip} index={index} />
          </div>
        ) : null)}
      </div>
    );
  }
}
export default CityCard;
