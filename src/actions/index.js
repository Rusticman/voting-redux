import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        console.log('bad login info');
       dispatch(authError('Bad Login Info'));

      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
console.log('signed out!')
  return { type: UNAUTH_USER };
}

export function signupUser({ email, password, userName }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, userName })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(error => {
        console.log('Not signed up!')
        dispatch(authError(error.response.data.error));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
