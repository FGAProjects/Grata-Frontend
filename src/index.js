import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import projectReducer from './store/reducers/project';
import sectorReducer from './store/reducers/sector';
import meetingReducer from './store/reducers/meeting';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
	sector: sectorReducer,
	meeting: meetingReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
	<Provider store = { store } >
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();