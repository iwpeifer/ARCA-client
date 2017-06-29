import React, { Component } from 'react';

import Room from './components/Room'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>placeholder</div>
        <Room roomId={1}/>
      </div>
    );
  }
}

export default App;
