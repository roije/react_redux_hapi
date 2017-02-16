/**
 * Created by roije on 2/9/17.
 */
import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessagesReducer'
import auth from './reducers/authReducer'

//All reducers combined into one state object
export default combineReducers({
  flashMessages,
  auth
})