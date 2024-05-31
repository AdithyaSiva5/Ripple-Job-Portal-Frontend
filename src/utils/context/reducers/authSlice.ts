// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserData | null;
  token: string | null;
}

interface UserData {
  id: number;
  username: string;
  email: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserData}>) => {
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;















































// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { userAuth } from "../../../constants/localStorage";

// interface UserState {
//   userData: any; // You can replace 'any' with the actual type of userData
//   validUser: boolean;
// }

// let token: string | null;
// let isValidUser: boolean;
// let userData: any; // You can replace 'any' with the actual type of userData

// const initialState: UserState = {
//   userData: userData,
//   validUser: isValidUser,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setReduxUser: (state, action: PayloadAction<{ userData: any; validUser: boolean }>) => {
//       state.userData = action.payload.userData;
//       state.validUser = action.payload.validUser;
//     },
//     updateReduxUser: (state, action: PayloadAction<any>) => {
//       state.userData = action.payload;
//     },
//     removeReduxUser: (state) => {
//       state.userData = null;
//       state.validUser = false;
//       localStorage.removeItem(userAuth);
//     },
//   },
// });

// export const { setReduxUser, updateReduxUser, removeReduxUser } = userSlice.actions;

// export default userSlice.reducer;



// import { authUrl } from "../../../services/api/endPoints";
// import { apiCall } from "../../../services/api/user/apiCalls";

// export const userAuthenticator = () => async (dispatch) => {
//     try {
//       token = localStorage.getItem(userAuth);
//       if (token) {
//         const data = {
//           headers: {
//             Authorization: token,
//           },
//         };
//         apiCall("get", authUrl.authUser, data).then((response) => {
//           isValidUser = response.valid;
//           userData = response.user;
//           dispatch(setReduxUser({ userData, validUser: isValidUser}));
//         }).catch((error) => {
//           dispatch(setReduxUser({userData: null, validUser: false}));
//         })
//       } else {
//         dispatch(removeReduxUser())
//       }
//     } catch (e) {
//       dispatch(removeReduxUser());
//     }
//   };
  
  
//   export const removeUser = () => async (dispatch) => {
//     dispatch(removeReduxUser());
//   }
  



