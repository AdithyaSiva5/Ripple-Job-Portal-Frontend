// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);













































// import { combineReducers, configureStore} from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";


// import thunk from "redux-thunk";

// import userSlice from "./reducers/userReducers"


// const persistConfig = {
//   key: "root",
//   storage,
//   transforms: [], 
//   stateReconciler: autoMergeLevel2,
// };

// const rootReducer = combineReducers({
//   user: userSlice,
  
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);




// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk]
// });

// export const persistor = persistStore(store);
