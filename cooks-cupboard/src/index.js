import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import history from './components/history';
import {Provider} from 'react-redux';
import store from './store'
// react-dom (what we'll use here)
import {Router } from 'react-router-dom'

ReactDOM.render(<Provider store={store}><Router history={history}>
    <App/>
  </Router></Provider>, document.getElementById('root'));
