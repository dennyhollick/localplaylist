import React, {Component} from 'react';
import {setView} from './actions.js';

class NavBar extends Component { 
  render() { 
    return ( 
      <header className="navbar">
        <span className="brand">Tripify</span> 
        <button type="button" className="login-form">Login</button> 
        <button type="button" className="register">New User?</button> 
        <button onClick={()=> {setView('locations')}}>Locations</button>
        <button onClick={()=> {setView('genres')}}>Genres</button>
      </header> 
    );
  }
}

export default NavBar;