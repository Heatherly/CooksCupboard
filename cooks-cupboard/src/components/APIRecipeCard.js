//If we want to use it, this is the ES6 syntax to include the button component from React-Bootstrap -- importing only the compnents needed reduces the size of our project: import Button from 'react-bootstrap/lib/Button';
//ES5 example: var Alert = require('react-bootstrap/lib/Alert');

import React from 'react';

class APIrecipes extends React.Component {
    constructor(props) {
        super(props);

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
                            <a href="#" className="btn btn-primary">Go somewhere</a>
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