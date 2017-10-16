import React from 'react';

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

class MyCookbook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mongoResults: []
        };

    this.handleDelete = this.handleDelete.bind(this);
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

refreshMongoResults(newData){
    this.setState({ mongoResults: newData} );
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
                           <button className="btn btn-primary">Email Me</button>
                           <button id={recipeInfo._id} onClick={this.handleDelete} className="btn btn-warning">Delete</button>
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