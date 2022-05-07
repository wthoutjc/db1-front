import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IAuth } from "../interfaces";
import { AppState } from "../store";

// Enum
import { Hierarchy } from "../enum"

const initialState: IAuth = {
  status: {
    logged: false,
    date: 0,
    hierarchy: null,
  },
};

const authSlice = createSlice({
  name: "[AUTH]",
  initialState,
  reducers: {
    login: (state) => {
      state.status = {
        ...state.status,
        logged: true,
        date: Date.now(),
        hierarchy: Hierarchy.admin,
      };
    },
    logout: (state) => {
      state.status = {
        ...initialState.status,
      };
    },
  },
});

export { authSlice };

// Actions
export const { login, logout } = authSlice.actions;

// Selector to access to the store
export const selectAuth = (state: AppState) => state.auth;

export default authSlice.reducer;
