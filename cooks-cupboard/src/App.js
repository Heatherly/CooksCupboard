//THIS FILE SERVES AS OUR MAIN.js//

import React, { Component } from 'react';
import './App.css';
import logo from './assets/CClogo_white.png'; // Tell Webpack this JS file uses this image

import SearchRecipe from './components/SearchRecipe';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <header>
            <div className="header">
                <img src={logo} id="header-logo" alt="Cook's Cupboard"/>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Log In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">My Cookbook</a>
                            </li>
                        </ul>
                        <span className="navbar-text">
                          <em>Let's get cooking!</em>
                        </span>
                    </div>
                </nav>
            </div>
        </header>

        <div className="container">
          <SearchRecipe/>
        </div>
      </div>
    );
  }
}

export default App;
