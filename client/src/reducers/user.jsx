import axios from 'axios';

export const LOGIN = 'login';

export const createUser = ({name, password}) => {
  return dispatch => {
    return axios
	  .post('/massage/customers/put', {name, password})
      .then(response => {
        console.log('registering:', name, password);
        return dispatch(createUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(createUserFail(error.response.data));
        throw error;
      });
  };
};

export const createUserSuccess = data => {
  return {
    type: LOGIN,
    payload: {
      name: data.name,
      password: data.password,
      group: data.group,
      products: data.products,
      loggedin: true,
      message: 'Login Successful',
    },
  };
};
export const createUserFail = data => {
  return {
    type: LOGIN,
    payload: {
      name: '',
      password: '',
      group: '',
      products: [],
      loggedin: false,
      message: data.message,
    },
  };
};

export const userLogin = ({name, password}) => {
  return dispatch => {
    return axios
		  .post(`/massage/customers/check`, {name, password})
      .then(response => {
        dispatch(userLoginSuccess(response.data));
      })
      .catch(error => {
        dispatch(userLoginFail(error.response.data));
        throw error;
      });
  };
};

export const userLoginSuccess = data => {
  return {
    type: LOGIN,
    payload: {
      name: data.name,
      password: data.password,
      group: data.group,
      products: data.products,
      loggedin: true,
      message: 'Login Successful',
    },
  };
};

export const userLoginFail = data => {
  return {
    type: LOGIN,
    payload: {
      name: '',
      password: '',
      group: '',
      loggedin: false,
      products: [],
      message: data.message,
    },
  };
};

export const userLogout = () => {
  return {
    type: LOGIN,
    payload: {
      name: '',
      password: '',
      group: '',
      loggedin: false,
      products: [],
      message: 'Successfully Logged Out',
    },
  };
};
export default function(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return {
        name: action.payload.name,
        password: action.payload.password,
        group: action.payload.group,
        message: action.payload.message,
        loggedin: action.payload.loggedin,
        products: action.payload.products,
      };

    default:
      return state;
  }
}
