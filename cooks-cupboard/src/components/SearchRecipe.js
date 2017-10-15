import React from 'react';
import AlertContainer from 'react-alert';
import '../App.css';
import {realAuth} from '../App';
import App from '../App';
import history from './history';
import { Route, Link, Switch, Redirect } from 'react-router-dom'

// Helper for making AJAX requests to our API
const helpers = require("../utils/helpers");


  

class SearchRecipe extends React.Component {
	
  constructor(props) {
	super(props);

	this.state = {
      term: "",
      diet: "",
      health: "",
      recipesArray: []
    };


	this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSave = this.handleSave.bind(this);
  // this.showAlert = this.showAlert.bind(this);
  }


// componentDidUpdate() {
//   this.setState({ recipesArray: [] }); //NOT WORKING EITHER!
// }

  //  alertOptions = {
  //   offset: 14,
  //   position: 'bottom left',
  //   theme: 'dark',
  //   time: 5000,
  //   transition: 'scale'
  // }
 
  // showAlert = () => {
  //   this.msg.show('Please login to save recipes', {
  //     time: 2000,
  //     type: 'error'
  //   })
  // }
  
  handleChange(event) { //looks for any changes on multiple form fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
   event.preventDefault();
   // console.log("TEST 1 " + this.state.recipesArray);
   // this.state.recipesArray = []; //NOT CLEARING THIS ARRAY AND I DON'T KNOW WHY!!
   //  console.log("TEST 2 " + this.state.recipesArray);
    // console.log("Passing Query to App parent");
    //gives the properties up to App to perform API Search
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
      console.log(saveRecipeObj);
      helpers.apiSave(saveRecipeObj).then(function(res){
        
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
	          <div className="card-columns">
                {console.log("apiResults------------------------ ")}
                {console.log(this.props.apiResults)}
                {this.state.recipesArray = []}
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
                        <button className="btn btn-primary" id={i} onClick={this.handleSave}>Save to MyCookbook</button>
                      </div>
                    </div>
                  );
                })}
	           </div>
	        </div>  

      </div>
    );
  }
}

export default SearchRecipe;
