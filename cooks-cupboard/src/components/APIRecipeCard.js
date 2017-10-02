//If we want to use it, this is the ES6 syntax to include the button component from React-Bootstrap -- importing only the compnents needed reduces the size of our project: import Button from 'react-bootstrap/lib/Button';
//ES5 example: var Alert = require('react-bootstrap/lib/Alert');

import React from 'react';

class APIrecipes extends React.Component {
    constructor(props) {
        super(props);

        }

    render() {
        const props = {...this.props};

        return (
            <div className={'ShowRobot'}>
                <ul className={'collection'}>
                    
                {props.robots.map(robot => ( //the _id is coming from Mongo
                    <li key={robot._id} className={'collection-item'}>
                        <span className={'title'}>{robot.name}</span>
                        <p>Power - {robot.power} <br />
                           Defense - {robot.defense}
                        </p>
                    </li>
                ))}

                </ul>
            </div >
        );
    }

    componentDidMount() {
    }
}

export default APIrecipes;