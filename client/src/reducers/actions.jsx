import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const Add_TO_CART = 'ADD_TO_CART';
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const registerUser = (user, history) => dispatch => {
  axios
    .post('/api/customers/register', user)
    .then(res => history.push('/login'))
    .catch(err => {
      console.log('in register dispatch:', err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post('/api/customers/login', user)
    .then(res => {
      const {token} = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(getCurrentUser());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getCurrentUser = () =>dispatch=> {
  axios.get('/api/customers/me').then(res => {
    const user = res.data;
	  console.log('inside get user',user);
    dispatch(setCurrentUser(user));
  });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
};

export const addToCart = product => dispatch => {
  axios
    .post('/api/customers/addtocart', {product})
    .then(res => {
	    console.log(res.data);
    })
    .catch(err => {
	    console.log('');
    });
};
