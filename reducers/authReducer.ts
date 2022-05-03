import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IAuth } from "../interfaces";
import { AppState } from "../store";

const initialState: IAuth = {
  status: false,
};

const authSlice = createSlice({
  name: "[AUTH]",
  initialState,
  reducers: {
    login: (state) => {
      state.status = true;
    },
    logout: (state) => {
      state.status = false;
    },
  },
});

export { authSlice };

// Actions
export const { login, logout } = authSlice.actions;

// Selector to access to the store
export const selectAuth = (state: AppState) => state.auth;

export default authSlice.reducer;
