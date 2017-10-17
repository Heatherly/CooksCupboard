import React from 'react';
// Helper for making AJAX requests to our API
const helpers = require("../utils/helpers");

class SearchRecipe extends React.Component {
    constructor(props) {
    super(props);

    this.state = { 
        title: "",
        ingredients: "",
        picURL: "",
        notes: ""
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) { //looks for any changes on multiple form fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
handleSave(event){
    event.preventDefault(); 
    var  saveRecipeObj = this.state;
    console.log(saveRecipeObj);
    // Send this data to the my API endpoint to save it to Mongo
    helpers.saveOne(saveRecipeObj).then(() => {
      console.log("Recipe saved!");
    this.setState({title: "", ingredients: "", picURL: "", notes: ""})
    });
}

render() {
    return (
      <div className={'addRecipe'}>
        
            <form id="addNewRecipe" onSubmit={this.handleSave}>

                <h2>Add a New Recipes</h2>
                  <div className="form-group">
                    <label htmlFor="title">Title: </label>
                        <input id="title" className="form-control" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange} required />
                    </div>
                    
                  <div className="form-group">
                    <label htmlFor="ingredients">Ingredients: </label>
                    <textarea className="form-control" id="ingredients" rows="3" value={this.state.ingredients} onChange={this.handleChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Directions/Notes: </label>
                    <textarea className="form-control" id="notes" rows="3"value={this.state.notes} onChange={this.handleChange}></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="picURL">Link to Image: </label>
                        <input id="picURL" className="form-control" type="text" placeholder="Link" value={this.state.picURL} onChange={this.handleChange} />
                    </div>
                 

                 <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={this.handleSave}>Submit</button>
                  </div>
            </form>
            

            

      </div>
    );
  }
}

export default SearchRecipe;
