import axios from 'axios';

export const LOGIN = 'login';

export const createUser = ({name, password}) => {
  return dispatch => {
    return axios.post(`/customers/put`, {name, password})
      .then(response => {
        dispatch(createUserSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createUserSuccess = (data) => {
  return {
    type: LOGIN,
    payload: {
      name: data.name,
      password: data.password,
      group: data.group,
      loggedin: true
    },
  };
};

export const userLogin = ({name, password}) => {
	//	console.log(name);
  return dispatch => {
    return axios.post(`/customers/check`, {name, password})
      .then(response => {
        dispatch(userLoginSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const userLoginSuccess = (data) => {
  return {
    type: LOGIN,
    payload: {
      name: data.name,
      password: data.password,
      group: data.group,
      loggedin: true,
    },
  };
};

export default function(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return {
        name: action.name,
        password: action.password,
        group: action.group,
        loggedin: true,
      };

    default:
      return state;
  }
}
