//----- NOT USED ANYMORE _ THIS HAD BEEN MOVED INTO SEARCHRECIPE.JS --------//


//If we want to use it, this is the ES6 syntax to include the button component from React-Bootstrap -- importing only the compnents needed reduces the size of our project: import Button from 'react-bootstrap/lib/Button';
//ES5 example: var Alert = require('react-bootstrap/lib/Alert');



import React from 'react';

class APIrecipes extends React.Component {
    constructor(props) {
        super(props);

        }
 clickMakeRecipe() {
      // alert(JSON.stringify(this.robot));
        const props = {...this.props}; {/*ES6: spreads out props into a new variable, spreads out all the key value pairs*/}
        
        fetch("./save", {
            method: "POST",
            body: JSON.stringify(this.robot),
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
            .then(json => {
                props.createRecipe({ ...json });
            })
            .catch(error => { console.log(error); });
    }   

    render() {
        // const props = {...this.props};

        return (
            <div className="card-columns">
                

                    {this.props.apiResults.map((recipeInfo, i) => {
                      return (

                        <div className="card" key={i}>
                          <img className="card-img-top" src={recipeInfo.recipe.image} alt={recipeInfo.recipe.label}/>
                          <div className="card-body">
                            <h4 className="card-title">{recipeInfo.recipe.label}</h4>
                            <ul className="card-text">INGREDIENTS: 
                                {recipeInfo.recipe.ingredients.map(function(ing, i) {
                                    return(
                                        <li key={i}>{ing.text}</li>
                                    )
                                })
                                    
                                }
                                
                            </ul>
                            <a type="submit" className="btn btn-primary" onClick={this.clickMakeRecipe}>Save to MyCookbook</a>
                          </div>
                        </div>
                      );
                    })}
                           
            </div>
    );
  
  }

    componentDidMount() {
    }
};

export default APIrecipes;