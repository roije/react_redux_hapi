/**
 * Created by roije on 2/6/17.
 */
import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData)
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    console.log(`/api/users/${identifier}`)
    return axios.get(`/api/users/${identifier}`);
  }
}