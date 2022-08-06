import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// Reducers
import { uiReducer, infoReducer, userReducer } from "../reducers";

export function makeStore() {
  return configureStore({
    reducer: { ui: uiReducer, info: infoReducer, user: userReducer },
  });
}

const store = makeStore();

// Types
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
