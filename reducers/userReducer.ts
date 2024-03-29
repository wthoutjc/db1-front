import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IUser } from "../interfaces";
import { AppState } from "../store";

const initialState: IUser = {
  logged: false,
  loading: false,
};

interface ActionLogged {
  payload: IUser;
}

interface ActionLoading {
  payload: boolean;
}

const userSlice = createSlice({
  name: "[user]",
  initialState,
  reducers: {
    setLogged: (state: IUser, action: ActionLogged) => {
      state.logged = action.payload.logged;
    },
    setLoading: (state: IUser, action: ActionLoading) => {
      state.loading = action.payload;
    },
  },
});

export { userSlice };

// Actions
export const { setLogged, setLoading } = userSlice.actions;

// Select to access to the store
export const selectuser = (state: AppState) => state.user;

export default userSlice.reducer;
