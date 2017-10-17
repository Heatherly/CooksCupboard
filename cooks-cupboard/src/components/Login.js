import React from 'react';
import { Route, BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom'

// Helper for making AJAX requests to our API
// var helpers = require("../utils/helpers");

class Login extends React.Component {
	constructor() {
	super();

  }

  render() {
    return (
      <div className={'LogIn'}>

      	<form method="POST" action="/login" id="login-form">
          <h2>Log In</h2>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input className="form-control" placeholder="Username" name="username" />
            </div>
            <div className="form-group col-md-6">
              <input className="form-control" placeholder="Password" type="password" name="password" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
		    </form>


        <span><h5>Not registered? register here:</h5></span>
        <Link to="/register" className="nav-link">Register</Link>

      </div>
    );
  }
}

export default Login;
