/**
 * Created by roije on 2/15/17.
 */
import axios from 'axios';

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data)
  }
}