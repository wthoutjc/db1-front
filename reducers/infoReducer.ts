import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IInfo } from "../interfaces";
import { AppState } from "../store";

const initialState: IInfo = {
  role: "auxiliar",
  date: "",
};

interface ActionRole {
  payload: IInfo;
}

const infoSlice = createSlice({
  name: "[INFO]",
  initialState,
  reducers: {
    setRole: (state: IInfo, action: ActionRole) => {
      state.role = action.payload.role;
    },
    setDate: (state: IInfo, action: ActionRole) => {
      state.date = action.payload.date;
    },
  },
});

export { infoSlice };

// Actions
export const { setRole, setDate } = infoSlice.actions;

// Select to access to the store
export const selectInfo = (state: AppState) => state.info;

export default infoSlice.reducer;
