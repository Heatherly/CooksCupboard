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
            <div className={'ShowRobot'}>
                <ul className={'collection'}>

                    {this.props.apiResults.map((recipeInfo, i) => {
                      return (
                        <div key={i} className="recipeInfo">
                          <a href={recipeInfo.recipe.url}>
                            {recipeInfo.recipe.label}</a>
                             uses these ingredients:  
                            {recipeInfo.recipe.ingredientLines}
                          
                        </div>
                      );
                    })}
           
                </ul>
            </div>
    );
  
  }

    componentDidMount() {
    }
};

export default APIrecipes;