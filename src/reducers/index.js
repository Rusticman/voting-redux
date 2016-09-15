import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  form, 
  auth:authReducer
});

export default rootReducer;
