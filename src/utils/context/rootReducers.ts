
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import darkModeReducer from './reducers/darkmodeSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  darkMode: darkModeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;