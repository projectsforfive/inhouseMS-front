import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { userType } from "@/types/mainType";

interface AuthState {
  isAuthenticated: boolean;
  user: userType | null; // Assuming userType is defined in your types
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logOut:(state, action:PayloadAction<any>) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    
  },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
