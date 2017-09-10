import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import NavBar from './NavBar.jsx';
// import { setView } from './actions.js';
import Home from './Home.jsx';
import videoMpg from '../static/Major-Tom.mp4';

// THIS WILL NEVER CONTAIN THIS.STATE ANYWHERE - 
class App extends Component {
  render() {
    let loading = '';
    let video = '';

    if (this.props.loading === true) {
      loading = (
        <div className="modal is-active animated fadeIn">
          <div className="modal-background" />
          <div className="modal-content">
            <div className="sweet-loading has-text-centered ">
              <ScaleLoader
                color={'white'}
                loading={this.props.loading}
                height={100}
                width={25}
              />
              <div className="has-text-centered has-text-white-bis animated infinite fadeIn">
                Making some music...
              </div>
            </div>
          </div>
          {/* <button className="modal-close is-large" aria-label="close" /> */}
        </div>
      );
    }

    if (this.props.view !== 'itinerary' && this.props.loading === false) {
      video = (
        <div>
          <div className="fullscreen-overlay" />
          <div className="fullscreen-bg">
            {/* <iframe id="video" title="video" className="fullscreen-bg__video" src="https://www.youtube.com/embed/34Na4j8AVgA?rel=0&amp;amp;controls=0&amp;amp;showinfo=0&amp;amp;autoplay=1&amp;amp;loop=1&amp;amp;modestbranding=1&amp;amp;iv_load_policy=3&amp;amp;enablejsapi=1&amp;amp;vq=medium&amp;amp;playlist=34Na4j8AVgA" /> */}
            <video loop muted autoPlay className="fullscreen-bg__video">
              <source src={videoMpg} type="video/mp4" />
            </video>
          </div>
        </div>
      );
    }

    return (
      <div className="main-container">
        {loading}
        {video}
        <NavBar view={this.props.view} />
        <Home
          view={this.props.view}
          locations={this.props.locations}
          genres={this.props.genres}
          concertData={this.props.concerts}
        />
        <footer className="footer">
          <div className="container is-small">
            <div className="columns">
              <div className="column">
                <div className="content has-text-centered">
                  <p>
                    Marshall Danel
                    <br />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user" />
                    </span>
                    marshalldanel@gmail.com
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="content has-text-centered">
                  <p>
                    Sanjana Desai
                    <br />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user" />
                    </span>
                    sanjana_desai@live.ca
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="content has-text-centered">
                  <p>
                    Denny Hollick
                    <br />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user" />
                    </span>
                    dennyhollick@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
