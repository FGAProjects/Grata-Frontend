import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducers/auth';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhaces = compose

const store = createStore(reducer, composeEnhaces(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        < App />   
    </Provider>
);

ReactDOM.render(app , document.getElementById('root'));

serviceWorker.unregister();