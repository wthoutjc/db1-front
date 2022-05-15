import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IAuth } from "../interfaces";
import { AppState } from "../store";

interface AuthAction {
  payload: IAuth;
}

interface AuthState {
  user: IAuth;
}

const initialState: AuthState = {
  user: {
    logged: false,
    id: "",
    name: "",
    hierarchy: null,
  },
};

const authSlice = createSlice({
  name: "[AUTH]",
  initialState,
  reducers: {
    login: (state: AuthState, action: AuthAction) => {
      state.user = {
        ...action.payload,
        logged: true,
      };
    },
    logout: (state: AuthState) => {
      state.user = {
        ...initialState.user,
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
