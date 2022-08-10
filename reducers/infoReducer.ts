import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IInfo } from "../interfaces";
import { AppState } from "../store";

const initialState: IInfo = {
  role: "auxiliar",
  data: null,
};

interface ActionRole {
  payload: IInfo;
}

interface ActionData {
  payload: {
    name: string;
    sede: string;
  };
}

const infoSlice = createSlice({
  name: "[INFO]",
  initialState,
  reducers: {
    setRole: (state: IInfo, action: ActionRole) => {
      state.role = action.payload.role;
    },
    setData: (state: IInfo, action: ActionData) => {
      state.data = action.payload;
    },
    resetData: (state: IInfo) => {
      state.data = null;
    }
  },
});

export { infoSlice };

// Actions
export const { setRole, setData, resetData} = infoSlice.actions;

// Select to access to the store
export const selectInfo = (state: AppState) => state.info;

export default infoSlice.reducer;
