import React, {Component} from 'react';
//import data from '../data/massagedata.json';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Helmet} from 'react-helmet';
import Routes from './routes.jsx';
import {setAuthToken, setCurrentUser, logoutUser} from '../reducers/actions';
import jwt_decode from 'jwt-decode';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/reducers.jsx';

const TITLE = 'Lili MassageSupplies';
const store = createStore(userReducer, applyMiddleware(thunk));

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
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
