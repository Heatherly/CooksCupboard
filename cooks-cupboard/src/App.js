//THIS FILE SERVES AS OUR MAIN.js//
import React, { Component } from 'react';
import './App.css';
import logo from './assets/CClogo_white.png'; // Tell Webpack this JS file uses this image
import SearchRecipe from './components/SearchRecipe';
import AddRecipe from './components/AddRecipe';
import MyCookbook from './components/MyCookbook';
import Login from './components/Login';
import Register from './components/Register';

import AuthorizedRoute from './components/AuthorizedRoute'
import store from './store'

// Including the Link component from React Router to navigate within our application without full page reloads
import { Route, BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom'

// Helper for making AJAX requests to our API
const helpers = require("./utils/helpers");
var axios = require("axios");

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
        term: "",
        diet: "",
        health: "",
        apiResults:[]
    }

    this.createRecipe = this.createRecipe.bind(this);
    this.setQuery = this.setQuery.bind(this);
  }
  
  componentWillMount() {
    this.setState({apiResults: []});
  }

  componentDidUpdate(prevProps, prevState) {
   // If we have a new search term, run a new search
    if (prevState.term !== this.state.term) {

    helpers.runQuery(this.state.term, this.state.diet, this.state.health).then(function(data) {
         // console.log(data);
         this.setState({ apiResults: data });
          }.bind(this));
      };
  }

  // This function allows the child Search to update the parent.
  setQuery(term, diet, health) {
      this.setState({ term: term, diet: diet, health: health });
  }

  createRecipe(recipe) {
    /*this.setState(prevState => ({
        recipes: [...prevState.recipes, recipe]
     })); ... -> is SPREAD OPERATOR - READ UP ON THIS!!*/
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
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Log In</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">|</span>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/mycookbook" className="nav-link">My Cookbook</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add" className="nav-link">Add Recipe</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/list" className="nav-link">Shopping List</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">|</span>
                            </li>
                            <li className="nav-item">
                              <a href="/logout" className="nav-link">Logout</a>
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

            
            <Switch>
              <Route exact path="/" render={(props) =>(<SearchRecipe setQuery={this.setQuery} createRecipe={this.createRecipe} apiResults={this.state.apiResults} recipes={this.state.recipes} />) }/>
              <AuthorizedRoute path="/mycookbook" component={MyCookbook}/> 
              <AuthorizedRoute path="/add" component={AddRecipe}/>                 
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
            </Switch>

        </div>
          
      </div>
    );
  }
}

export default App;
