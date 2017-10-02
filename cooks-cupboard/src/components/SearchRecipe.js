import React from 'react';

class SearchRecipe extends React.Component {
	constructor(props) {
	super(props);

	this.state = {
      term: "",
      diet: "",
      health: ""
    };


	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { //looks for any changes on multiple form fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
  	event.preventDefault();
    console.log("Passing Query to App parent");
    // console.log(this.state.term, this.state.diet, this.state.health);
    this.props.setQuery(this.state.term, this.state.diet, this.state.health);
    //gives the properties up to App to perform API Search
    //resets the state
    this.setState({ term: "", startYear: "", endYear: "" });
  }



render() {
    return (
      <div className={'SearchRecipe'}> {/*//ES6 syntax vs <div className="Search">*/}
        <h2>Search New Recipes</h2>

        	<div className="card searchForm">
			  <div className="card-body">
			  	<form id="searchAPI" onSubmit={this.handleSubmit}>
			  	  <div className="form-group row">
			  		<label htmlFor="term">Keyword: </label>
				  		<div className="col-sm-10">
	          				<input id="term" className="form-control" type="text" placeholder="Search" value={this.state.term} onChange={this.handleChange} required />
	          			</div>
          		  </div>
          		  <div className="form-group row">
          			<label htmlFor="diet">Diet: </label>
          			  <div className="col-sm-5">
		          		<select className="form-control" id="diet" value={this.state.diet} onChange={this.handleChange}>
					    	<option></option>
							<option value="balanced">Balanced</option>
							<option value="high-protein">High-Protein</option>
							<option value="low-carb">Low-Carb</option>
							<option value="low-fat">Low-Fat</option>
					    </select>
					  </div>
				  	<label htmlFor="health">Lifestyle: </label>
				  	  <div className="col-sm-5">
		          		<select className="form-control" id="health" value={this.state.health} onChange={this.handleChange}>
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
				  <div className="form-group row">
					<button type="submit" className="btn btn-primary" value="search">Search</button>
				  </div>
				  <div id="edamam-badge" data-color="dark"></div>
				</form>
			  </div>
			</div>

            

      </div>
    );
  }
}

export default SearchRecipe;
