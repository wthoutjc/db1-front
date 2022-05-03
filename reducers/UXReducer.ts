import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IUx } from "../interfaces";
import { AppState } from "../store";

const initialState: IUx = {
  clicks: 0,
};

const uxSlice = createSlice({
  name: "[UX]",
  initialState,
  reducers: {
    incrementClicks: (state) => {
      state.clicks += 1;
    },
    turnOffRender: (state) => {
      state.clicks = 0;
    },
  },
});

export { uxSlice };

// Actions
export const { incrementClicks, turnOffRender } = uxSlice.actions;

// Selector to access to the store
export const selectUX = (state: AppState) => state.auth;

export default uxSlice.reducer;
