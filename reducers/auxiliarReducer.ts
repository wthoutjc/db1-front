import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IAuxiliar } from "../interfaces";
import { AppState } from "../store";

const initialState: IAuxiliar = {
  logged: false,
};

interface ActionLogged {
  payload: IAuxiliar;
}

const auxiliarSlice = createSlice({
  name: "[AUXILIAR]",
  initialState,
  reducers: {
    setLogged: (state: IAuxiliar, action: ActionLogged) => {
      state.logged = action.payload.logged;
    },
  },
});

export { auxiliarSlice };

// Actions
export const { setLogged } = auxiliarSlice.actions;

// Select to access to the store
export const selectAuxiliar = (state: AppState) => state.auxiliar;

export default auxiliarSlice.reducer;
