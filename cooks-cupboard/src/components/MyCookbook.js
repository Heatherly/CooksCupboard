import React from 'react';
import {realAuth} from './SearchRecipe';
import { Link } from 'react-router-dom'

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

class MyCookbook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mongoResults: []
        };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    }
    
  componentDidMount() {
  // use fetch() to get the saved recipes for this user from our api at /myfaves
   helpers.apiGet().then(function(query){
        this.setState({ mongoResults: query.data.recipes });
        console.log(this.state.mongoResults);
      }.bind(this));
  }

  handleDelete(event) {
    // Collect the clicked article's id
    var recipeMongoId = event.target.id;
   // Send this data to the API endpoint to save it to Mongo
    helpers.apiDelete(recipeMongoId).then(() => {
      //Refresh this component to account for deletion
      helpers.apiGet().then((query) => {
        this.setState({ mongoResults: query.data.recipes });
      });

    });
  }

  handleEmail(event){

    var emailObj = this.state.mongoResults.find(o => o._id === event.target.id);

    console.log(emailObj);
    
    helpers.sendEmail(emailObj).then(function(res){

    
    });
  }

refreshMongoResults(newData){
    this.setState({ mongoResults: newData} );
  }
     render() {
      // const hasSavedRecipes = this.state.mongoResults;
      return (
        <div>
          <h1>My Cookbook</h1>
        
        {(this.state.mongoResults.length > 0) ? 
            <div className="recipeCards">
               <div className="card-columns">
                 {this.state.mongoResults.map((recipeInfo, i) => {
                     
                   return (
                     <div className="card" key={recipeInfo._id}>
                       <img className="card-img-top" src={recipeInfo.picURL} alt={recipeInfo.title}/>
                       <div className="card-body">
                         <h4 className="card-title">{recipeInfo.title}</h4>
                         <ul className="card-text">INGREDIENTS:                          
                            {recipeInfo.ingredients.split(';').map(ingredient => {
                              return <li> {ingredient} </li>}
                            )}
                         </ul>
                         <p>Source: <a href={recipeInfo.url}>{recipeInfo.source}</a></p>
                         <button id={recipeInfo._id} onClick={this.handleEmail}className="btn btn-primary">Email Me</button>
                         <button id={recipeInfo._id} onClick={this.handleDelete} className="btn btn-warning">Delete</button>
                       </div>
                     </div>
                   );
                 })}
                </div>
            </div>
            : 
            <p><strong>Oops, looks like there are no recipes saved. <Link to="/">Search for new recipes!</Link></strong></p>
           }

            
          </div>                      
    );
  
  }

};

export default MyCookbook;