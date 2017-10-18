import React from 'react';

// Helper for making AJAX requests to our API
// var helpers = require("../utils/helpers");

class Register extends React.Component {
	constructor() {
	super();

  }

  render() {
    return (
      <div className={'Register'}>

      	<form method="POST" action="/register" id="register-form">
          <h2>Register Your Account</h2>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input className="form-control" placeholder="First Name" type="text" name="firstName"/>
            </div>
            <div className="form-group col-md-6">
              <input className="form-control" placeholder="Last Name" type="text" name="LastName"/>
            </div>
          </div>
          <div className="form-group">    
              <input className="form-control" placeholder="Email" name="userEmail"/>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input className="form-control" placeholder="Username" name="username"/>
            </div>
            <div className="form-group col-md-6">
              <input className="form-control" placeholder="Password" type="password" name="password"/>
            </div>
          </div> 
          <button type="submit" className="btn btn-primary">Submit</button>
		    </form>

      </div>
    );
  }
}

export default Register;
