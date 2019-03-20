import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/reducers.jsx';

const store=createStore(userReducer,applyMiddleware(thunk));
ReactDOM.render(
	<Provider store={store}>	
		<App />
	</Provider>, document.getElementById('root'));

serviceWorker.unregister();
