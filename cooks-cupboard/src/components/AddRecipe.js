import React from 'react';

class SearchRecipe extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      title: "",
      ingredients: "",
      picURL: "",
      notes: "",
    };


    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { //looks for any changes on multiple form fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   console.log("Passing Query to App parent");
  //   // console.log(this.state.term, this.state.diet, this.state.health);
  //   this.props.setQuery(this.state.term, this.state.diet, this.state.health);
  //   //gives the properties up to App to perform API Search
  //   //resets the state
  //   this.setState({ term: "", startYear: "", endYear: "" });
  // }



render() {
    return (
      <div className={'addRecipe'}>
        
            <form id="addNewRecipe" onSubmit={this.handleSubmit}>

                <h2>Add a New Recipes</h2>
                  <div className="form-group">
                    <label htmlFor="term">Title: </label>
                        <input id="term" className="form-control" type="text" placeholder="Title" value={this.state.term} onChange={this.handleChange} required />
                    </div>
                    
                  <div class="form-group">
                    <label htmlFor="ingredients">Ingredients: </label>
                    <textarea class="form-control" id="ingredients" rows="3" value={this.state.ingredients} onChange={this.handleChange}></textarea>
                  </div>
                  <div class="form-group">
                    <label htmlFor="notes">Directions/Notes: </label>
                    <textarea class="form-control" id="notes" rows="3"value={this.state.notes} onChange={this.handleChange}></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="picURL">Link to Image: </label>
                        <input id="picURL" className="form-control" type="text" placeholder="Link" value={this.state.picURL} onChange={this.handleChange} required />
                    </div>
                 

                 <div className="form-group">
                    <button type="submit" className="btn btn-primary" value="Submit">Submit</button>
                  </div>
                  <div id="edamam-badge" data-color="dark"></div>
                </form>
            

            

      </div>
    );
  }
}

export default SearchRecipe;
