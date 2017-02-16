/**
 * Created by roije on 2/15/17.
 */
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken'

import { SET_CURRENT_USER } from '../types';

export function setCurrentUser(user) {
  return{
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token);

      //Jwt decode and pass user object
      dispatch(setCurrentUser(jwt.decode(token)));
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}))
  }
}