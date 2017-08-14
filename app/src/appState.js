import React from 'react';
import {render} from 'react-dom';
import App from './App.jsx';

let state;

function appRender() {
  render(<App {...state}/>, document.getElementById('react-root'));
}

export function setState(newState) { 
  state = {...state, ...newState};
  appRender();
}

export function getState() { 
  return state;
}