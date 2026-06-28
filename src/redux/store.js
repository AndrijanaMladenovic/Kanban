import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    ui: uiReducer,
  },
});
store.subscribe(() => {
  localStorage.setItem("boards", JSON.stringify(store.getState().boards));
});
