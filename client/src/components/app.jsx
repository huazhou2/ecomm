import React, {Component} from 'react';
//import data from '../data/massagedata.json';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Helmet} from 'react-helmet';
import Routes from './routes.jsx';
import {
  setAuthToken,
  getCurrentUser,
  logoutUser,
  UPDATE_CART
} from '../reducers/actions';
import jwt_decode from 'jwt-decode';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/reducers.jsx';

const TITLE = 'Lili MassageSupplies';
const store = createStore(userReducer, applyMiddleware(thunk));

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(getCurrentUser());

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}
if (localStorage.products) {
	console.log('inside loading local products');
  store.dispatch({
    type: UPDATE_CART,
    payload: JSON.parse(localStorage.getItem('products')),
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Router>
            <Routes />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
