
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import darkModeReducer from './darkmodeSlice';
import adminAuthReducer from './adminAuthSlice';



const rootReducer = combineReducers({
  auth: authReducer,
  darkMode: darkModeReducer,
  adminAuth: adminAuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;