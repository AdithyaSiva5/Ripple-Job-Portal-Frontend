
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import darkModeReducer from './darkmodeSlice';
import adminAuthReducer from './adminAuthSlice';
import postReducer from './postSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  darkMode: darkModeReducer,
  adminAuth: adminAuthReducer,
  posts: postReducer,
});

export default rootReducer;