
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export default rootReducer;