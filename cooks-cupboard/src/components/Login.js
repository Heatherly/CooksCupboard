import React from 'react';

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

      </div>
    );
  }
}

export default Login;
