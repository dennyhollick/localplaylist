import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import { userInfo, userLogout } from './actions.js';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false,
    };
    this.goAwayModal = this.goAwayModal.bind(this);
  }

  goAwayModal() {
    this.setState({ loginModal: false, registerModal: false });
  }

  render() {
    const view = this.props.view;
    let whiteclass = 'has-text-white-bis';
    if (view === 'itinerary') {
      whiteclass = '';
    }
    const whiteclasslogo = `logo-text navbar-item ${whiteclass}`;

    const user = userInfo();
    const userName = user ? user.firstname : null;
    let navBarEnd;

    if (userName) {
      navBarEnd = (<div className="navbar-end">
        <div className="navbar-item">
          <small>Hi {userName}</small>
        </div>
        <div className="navbar-item">
          <a
            role="menuitem"
            tabIndex="0"
            type="button"
            className="is-primary"
            onClick={() => { userLogout(); }}
          >
              Logout
          </a>
        </div>
      </div>
      );
    } else {
      navBarEnd =
        (<div className="navbar-end">
          <div className="navbar-item ">
            <a
              role="menuitem"
              tabIndex="0"
              type="button"
              className="is-primary"
              href="/spotify-userAuth"
              target="popup"
            >
              <span className={whiteclass}>Connect Spotify</span>
            </a>
          </div>
        </div>
        );
    }


    return (
      <header>
        <div className="container">
          <nav className="navbar">
            <div className="navbar-brand ">
              <a href="/" className={whiteclasslogo}>RoadieSounds</a>
            </div>
            {navBarEnd}
            {(this.state.loginModal ? (
              <LoginForm isActive="modal is-active animated fadeIn" allGone={this.goAwayModal} />
            ) : null)}
            {(this.state.registerModal ? (
              <RegisterForm
                isActive="modal is-active animated fadeIn"
                allGone={this.goAwayModal}
              />
            ) : null)}
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
