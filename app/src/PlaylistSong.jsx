import React, { Component } from 'react';
import Sound from 'react-sound';

class PlaylistSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: 'STOPPED',
    };
  }

  playButton() {
    const status = this.state.player;
    if (status !== 'PLAYING') {
      this.setState({
        player: 'PLAYING',
      });
    } else {
      this.setState({
        player: 'PAUSED',
      });
    }
  }

  stopButton() {
    this.setState({
      player: 'STOPPED',
    });
  }


  render() {
    const title = this.props.title;
    const artist = this.props.artist;
    const previewurl = this.props.previewurl;
    const index = this.props.index + 1;
    let soundFile;
    let icons = (
      <span className="has-text-grey-lighter">Sorry, No Preview</span>
    );

    if (previewurl) {
      soundFile = (
        <Sound
          url={previewurl}
          playStatus={this.state.player}
        />
      );
      icons = (
        <div>
          <span className="icon">
            <i
              role="button"
              className="fa fa-play-circle"
              onClick={() => {
                this.playButton();
              }}
            />
          </span>
          <span className="icon">
            <i
              role="button"
              className="fa fa-stop-circle"
              onClick={() => {
                this.stopButton();
              }}
            />
          </span>
        </div>
      );
    }


    return (

      <div className="box is-marginless is-radiusless">
        {soundFile}
        <div className="columns">
          <div className="column is-1 has-text-centered">
            {index}
          </div>
          <div className="column is-4">
            {artist}
          </div>
          <div className="column is-4">
            <a href={previewurl}>{title}</a>
          </div>
          <div className="column is-3 has-text-right">
            {icons}
          </div>
        </div>
      </div>
    );
  }
}
export default PlaylistSong;
