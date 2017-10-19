import React from 'react';
import '../App.css';
import history from './history';
import App from '../App';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import AlertContainer from 'react-alert'


var axios = require("axios");
// Helper for making AJAX requests to our API
const helpers = require("../utils/helpers");

export const realAuth = {
   async isAuthenticated() {
    var apiURL = window.location.origin + '/isloggedin';
     const res = await axios.get(apiURL);
     console.log(res);
     if (res.data === 1) {
       return true;
     }
     return false;
   },
   authenticate(username, password, cb) {
 
   },
   signout(cb) {
 
   }
 }
  

class SearchRecipe extends React.Component {
	
  constructor(props) {
	super(props);

	this.state = {
      term: "",
      diet: "",
      health: "",
    };

	this.alertOptions = {
		offset: 25,
		position: 'top left',
		theme: 'light',
		time: 5000,
		transition: 'scale'
	}
  
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSave = this.handleSave.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
  this.showAlert = this.showAlert.bind(this);
  }

  
  showAlert() {
    this.msg.show('Recipe saved to MyCookbook', {
      time: 2000,
      type: 'success'
    })
  }

  handleChange(event) { //looks for any changes on multiple form fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
   event.preventDefault();
    this.props.setQuery(this.state.term, this.state.diet, this.state.health);
    //resets the state
    this.setState({ term: "", diet: "", health: ""});
  }

  handleSave(event){
     
       // Collect the clicked recipe's id
          var recipeId = event.target.id;
          // console.log(recipeId);
          // Collect the clicked article's attributes
          var  saveRecipeObj = this.props.apiResults[recipeId].recipe;
          // Send this data to the my API endpoint to save it to Mongo
          // console.log(saveRecipeObj);
          realAuth.isAuthenticated().then(auth => {if (auth) {
          helpers.apiSave(saveRecipeObj).then(function(res){

          })} else {history.push('/login')}
        }); 
     this.showAlert();
  }

  handleEmail(event){
    var recipeId = event.target.id;

    var emailObj = this.props.apiResults[recipeId].recipe;

    console.log(emailObj);
    realAuth.isAuthenticated().then(auth => {if (auth) {
    helpers.sendEmail(emailObj).then(function(res){

      })} else {history.push('/login')}
    });
  }

render() {
    return (
      <div className={'SearchRecipe'}>
      {/* SEARCH API FORM */}
			<form id="searchAPI" onSubmit={this.handleSubmit}>

			  	<h2>Search New Recipes</h2>
			  	  <div className="form-group">
			  		<label htmlFor="term">Keyword: </label>
				  		<input id="term" className="form-control" type="text" placeholder="Search" onChange={this.handleChange} required />
	          		</div>
	          		
          		  <div className="form-row">
          		  	<div className="form-group col-md-6">
          		  		<label htmlFor="diet">Diet: </label>
		          		<select className="form-control" id="diet" onChange={this.handleChange}>
					    	<option></option>
							<option value="balanced">Balanced</option>
							<option value="high-protein">High-Protein</option>
							<option value="low-carb">Low-Carb</option>
							<option value="low-fat">Low-Fat</option>
					    </select>
					</div>
					<div className="form-group col-md-6">
				  		<label htmlFor="health">Lifestyle: </label>
		          		<select className="form-control" id="health" onChange={this.handleChange}>
								<option></option>
								<option value="alcohol-free">Alcohol Free</option>
								<option value="tree-nut-free">Tree Nut Free</option>
								<option value="peanut-free">Peanut Free</option>
								<option value="sugar-conscious">Sugar Conscious</option>
								<option value="vegan">Vegan</option>
								<option value="vegetarian">Vegetarian</option>
					    </select>
				  	  </div>
				  	</div>
				 
				 <div className="form-group">
					<button type="submit" className="btn btn-primary" value="search">Search</button>
          </div>
				  <div id="edamam-badge" data-color="dark"></div>
				</form>
			
{/*THIS IS WHERE API RESULTS WILL DISPLAY*/}
			<div className="recipeCards">
        {(this.props.apiResults.length > 1) ?
                   
	          <div className="card-columns">
               {console.log("apiResults------------------------ ")}
               {console.log(this.props.apiResults)} 
                
                {this.props.apiResults.map((recipeInfo, i) => {
                  return (
                    <div className="card" key={i}>
                      <img className="card-img-top" src={recipeInfo.recipe.image} alt={recipeInfo.recipe.label}/>
                      <div className="card-body">
                        <h4 className="card-title">{recipeInfo.recipe.label}</h4>
                          <ul className="card-text">INGREDIENTS: 
                            {recipeInfo.recipe.ingredients.map(function(ing, i) {
                                return( <li key={i}>{ing.text}</li> )
                            })}
                          </ul>
                        <p>Source: <a href={recipeInfo.recipe.url}>{recipeInfo.recipe.source}</a></p>
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                        <button className="btn btn-primary" id={i} onClick={this.handleSave}>Save to MyCookbook</button>
                        <button className="btn btn-primary" id={i} onClick={this.handleEmail}>Email Me</button>
                      </div>
                    </div>
                  );
                })}
	           </div>
             : [
             (this.props.apiResults.length === 1) ? 
                <div></div>
              :
              <p className="text-center">No recipe results to display. Please search again.</p>    
              ]
        }
	        </div>  

      </div>
    );
  }
}

export default SearchRecipe;
