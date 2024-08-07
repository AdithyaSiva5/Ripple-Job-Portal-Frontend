import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserData | null;
  token: string | null;
  userPost: any[];
}

interface UserData {
  token: string;
  user: any;
}

const UserInitialState: AuthState = {
  user: null,
  token: null,
  userPost: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: UserInitialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserData }>) => {
      state.user = action.payload.user.user;
      state.token = action.payload.user.token;
    },
    updateUser: (state, action: PayloadAction<{ user: UserData }>) => {
      state.user = action.payload.user.user;
    },
    updateUserSettings: (state, action: PayloadAction<{ profile: any }>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          profile: {
            ...state.user.profile,
            ...action.payload.profile,
          },
        };
      }
    },
    logout: (state: any) => {
      state.user = null;
      state.token = null;
      state.userPost = [];
    },

    setUsePosts: (state, action: PayloadAction<{ userPost: any[] }>) => {
      state.userPost = action.payload.userPost;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setUsePosts,
  updateUser,
  updateUserSettings,
  refreshToken,
} = authSlice.actions;
export default authSlice.reducer;
