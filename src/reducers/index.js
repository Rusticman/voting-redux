import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import pollReducer from './poll_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  form,
  auth:authReducer,
  polls:pollReducer
});

export default rootReducer;
