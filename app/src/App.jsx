import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import {setView} from './actions.js';
import Locations from './locations.jsx';

// THIS WILL NEVER CONTAIN THIS.STATE ANYWHERE - 
class App extends Component {
  
  render() {
    let currentView;
    switch(this.props.view) {
      case 'locations': 
        currentView = <Locations locations={this.props.locations}/> 
      break;
      case 'genres': 
        currentView = <Genres genres={this.props.genres}/> 
      break;
    }

    return (
      <div className="MainContainer"> 
        <NavBar/> 
        <pre>{JSON.stringify(this.props)}</pre> 
        {currentView}
      </div>
    );
    
  }
  
}

export default App;
