import {setState, getState} from './appState';

// WHENEVER YOU WANT TO CHANGE THE STATE YOU MUST DEFINE AN ACTION THAT DOES SO
//KEEP YOUR VIEWS DUMB
//Actions up, data down

export function setView(view) { 
  setState({view});
}

// export function addLocation(location) { 
//   setState({location})
// }