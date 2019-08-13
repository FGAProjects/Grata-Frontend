import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import assignmentReducer from './store/reducers/assignments';

const composeEnhaces = compose

const rootReducer = combineReducers({
    auth: authReducer,
    assignments: assignmentReducer
});

const store = createStore(rootReducer, composeEnhaces(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        < App />   
    </Provider>
);

ReactDOM.render(app , document.getElementById('root'));

serviceWorker.unregister();