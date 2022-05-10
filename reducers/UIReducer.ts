import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { INotification, UI, SideBarData } from "../interfaces";
import { AppState } from "../store";

const initialState: UI = {
  notifications: [],
};

interface NewNotification {
  payload: INotification;
}
interface RemoveNotification {
  payload: string;
}

const uiSlice = createSlice({
  name: "[UI]",
  initialState,
  reducers: {
    newNotification: (state, action: NewNotification) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state, action: RemoveNotification) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export { uiSlice };

// Actions
export const { newNotification, removeNotification } = uiSlice.actions;

// Select to access to the store
export const selectUI = (state: AppState) => state.auth;

export default uiSlice.reducer;
