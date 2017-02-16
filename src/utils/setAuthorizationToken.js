/**
 * Created by roije on 2/16/17.
 */
import axios from 'axios';

export default function setAuthorizationToken(token) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}