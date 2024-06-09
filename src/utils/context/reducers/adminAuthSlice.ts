import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
  admin: UserData | null;
  token: string | null;
  

}

interface UserData {
  id: number;
  username: string;
  email: string;
  token:string;
}

const AdminInitialState: AdminAuthState = {
  admin: null,
  token: null,

};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState:AdminInitialState,
  reducers: {
    AdminLoginSuccess: (state, action: PayloadAction<{admin: UserData }>) => {
      state.admin = action.payload.admin;
      state.token=action.payload.admin.token
 
    },
    AdminLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});


export const { AdminLoginSuccess, AdminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
