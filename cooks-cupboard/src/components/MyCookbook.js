//If we want to use it, this is the ES6 syntax to include the button component from React-Bootstrap -- importing only the compnents needed reduces the size of our project: import Button from 'react-bootstrap/lib/Button';
//ES5 example: var Alert = require('react-bootstrap/lib/Alert');

import React from 'react';

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

class MyCookbook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mongoResults: []
        };

    }
    
componentDidMount() {
// use fetch() to get the saved recipes for this user from our api at /myfaves
         helpers.apiGet().then(function(query){
              this.setState({ mongoResults: query.data.recipes });
              console.log(this.state.mongoResults);
            }.bind(this));

}


    render() {
        // const props = {...this.props};

        return (
        <div className="myCookbook">    
            <div>
                <h1>My Cookbook</h1>

            </div>
              <div className="recipeCards">
                           <div className="card-columns">
                             {this.state.mongoResults.map((recipeInfo, i) => {
                                 
                               return (
             
                                 <div className="card" key={i}>
                                   <img className="card-img-top" src={recipeInfo.picURL} alt={recipeInfo.title}/>
                                   <div className="card-body">
                                     <h4 className="card-title">{recipeInfo.title}</h4>
                                     <ul className="card-text">INGREDIENTS:                          
                                        {recipeInfo.ingredients.split(';').map(ingredient => {
                                          return <li> {ingredient} </li>}
                                        )}
                                     </ul>
                                     <p>Source: <a href="#"></a></p>
                                     <button className="btn btn-primary">Email Me</button>
                                     <button className="btn btn-warning">Delete</button>
                                   </div>
                                 </div>
                               );
                             })}
                            </div>
              </div>
        </div>
                               
    );
  
  }

};

export default MyCookbook;