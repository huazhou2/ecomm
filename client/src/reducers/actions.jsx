import axios from 'axios';
import {combineArrays} from './helper.jsx';
//import jwt_decode from 'jwt-decode';

export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CART = 'UPDATE_CART';
export const CLEAR_CART = 'CLEAR_CART';
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

export const getCurrentUser = () => dispatch => {
  axios.get('/api/customers/me').then(res => {
    const user = res.data;
	  /*dispatch({
      type: UPDATE_CART,
      payload: combineArrays(
        user.products,
        JSON.parse(localStorage.getItem('products')),
      ),
    });*/
    dispatch(updateCart(
      combineArrays(
        user.products,
        JSON.parse(localStorage.getItem('products')),true)));
    delete user.products;
	  console.log('deleting local storage');
  localStorage.removeItem('products');
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
  localStorage.removeItem('products');
};

export const addLocalProducts = product => dispatch => {
  var products = combineArrays(
    [product],
    JSON.parse(localStorage.getItem('products')),
  );

  localStorage.setItem('products', JSON.stringify(products));
  dispatch({
    type: UPDATE_CART,
    payload: products,
  });
};

export const updateLocalProducts = products => dispatch => {
  localStorage.setItem('products', JSON.stringify(products));
  dispatch({
    type: UPDATE_CART,
    payload: products,
  })
};

export const clearLocalProducts = () => dispatch => {
  var products = [];
  localStorage.setItem('products', JSON.stringify(products));
  dispatch({
    type: CLEAR_CART,
    payload: [],
  })
};

export const addToCart = (product, isAuthenticated) => dispatch => {
  if (isAuthenticated) {
    axios
      .post('/api/customers/addtocart', {product})
      .then(res => {
        dispatch({
          type: UPDATE_CART,
          payload: res.data,
        });
      })
      .catch(err => {
        //if unauthorized adding to cart
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  } else dispatch(addLocalProducts(product));
};
export const updateCart = (products, isAuthenticated) => dispatch => {
  if (isAuthenticated) {
    axios
      .post('/api/customers/updatecart', {products})
      .then(res => {
	      console.log('after updates local products',res.data);
        dispatch({
          type: UPDATE_CART,
          payload: res.data,
        });
      })
      .catch(err => {
        //if unauthorized adding to cart
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  } else dispatch(updateLocalProducts(products));
};

export const clearCart = (isAuthenticated) => dispatch => {
  if (isAuthenticated) {
    axios
      .post('/api/customers/clearcart' )
      .then(res => {
        dispatch({
          type: CLEAR_CART,
          payload: [],
        });
      })
      .catch(err => {
        //if unauthorized adding to cart
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  } else dispatch(clearLocalProducts());
};
