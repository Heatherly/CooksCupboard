//THIS FILE SERVES AS OUR MAIN.js//

import React, { Component } from 'react';
import './App.css';
import logo from './assets/CClogo_white.png'; // Tell Webpack this JS file uses this image
import SearchRecipe from './components/SearchRecipe';
import APIRecipeCard from './components/APIRecipeCard';
import AddRecipe from './components/AddRecipe';

// Including the Link component from React Router to navigate within our application without full page reloads
// var Link = require("react-router").Link;

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

class App extends Component {

constructor(props) {
    super(props);

    this.state = {
      term: "",
      diet: "",
      health: "",
      apiResults:[]
    };

    this.setQuery = this.setQuery.bind(this);
  }

componentDidUpdate(prevProps, prevState) {

 // If we have a new search term, run a new search
    if (prevState.term !== this.state.term) {
      // console.log(this.state.term);
      // console.log(this.state.diet);
      // console.log(this.state.health);

  helpers.runQuery(this.state.term, this.state.diet, this.state.health).then(function(data) {
       // console.log(data);
       this.setState({ apiResults: data });
        }.bind(this));
    };
  }


 //  // This function allows the child Search to update the parent.
setQuery(term, diet, health) {
    this.setState({ term: term, diet: diet, health: health });
  }

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
                                <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Log In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">My Cookbook</a>
                            </li>
                        </ul>
                        <span className="navbar-text">
                          <em>Let's get cooking!</em>
                          <a href="/logout">Logout</a>
                        </span>
                    </div>
                </nav>
            </div>
        </header>

        <div className="container">

          <div className="search-form">
            <SearchRecipe setQuery={this.setQuery} apiResults={this.state.apiResults}/>
          </div>

          <div className="api-results">
            <APIRecipeCard apiResults={this.state.apiResults}/>
          </div>

            <AddRecipe/>
        </div>
          
      </div>
    );
  }
}

export default App;
