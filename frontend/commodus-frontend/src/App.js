import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


import InitialScreen from './Components/Screens/InitialScreen/InitialScreen';

class App extends Component {

  render() {

    
    return (
      <div className="App">
        <InitialScreen>filmes</InitialScreen>
      </div>
    );
  }
}

export default App;
