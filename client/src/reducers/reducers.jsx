import {combineReducers} from 'redux';

export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CART = 'UPDATE_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const initialState = {
  isAuthenticated: false,
  user: {},
  products: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CART:
      return [...action.payload];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  products: cartReducer,
});
