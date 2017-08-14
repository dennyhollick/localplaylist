import React, {Component} from 'react';
import {setView} from './actions.js';

class Locations extends Component { 
  render() { 
    return (
      <main> 
        <section className="locationsContainer">Location</section> 
        <div>#1</div>
        {console.log("hello")}
      </main>
    );
  }
}
export default Locations;