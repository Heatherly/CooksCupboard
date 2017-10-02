//THIS FILE SERVES AS OUR MAIN.js//

import React, { Component } from 'react';
import './App.css';

import SearchRecipe from './components/SearchRecipe';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Cook's Cupboard</h1>
        </header>
        <div>
          <SearchRecipe/>

        </div>
      </div>
    );
  }
}

export default App;
