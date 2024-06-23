import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserData | null;
  token: string | null;
  userPost:any[]
}

interface UserData {
  id: number;
  username: string;
  email: string;
  token:string;
}

const UserInitialState: AuthState = {
  user: null,
  token: null,
  userPost:[]
};

const authSlice = createSlice({
  name: 'auth',
  initialState:UserInitialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserData }>) => {
      state.user = action.payload.user.user;

      state.token=action.payload.user.token
    }, 
    logout: (state:any) => {
      state.user = null;
      state.token = null;
      state.userPost=[]
    },
    setUsePosts:(state,action:PayloadAction<{userPost:any[]}>)=>{
     state.userPost=action.payload.userPost
    }
  },
});

export const { loginSuccess, logout,setUsePosts } = authSlice.actions;
export default authSlice.reducer;