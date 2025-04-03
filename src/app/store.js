import { configureStore } from "@reduxjs/toolkit";
import rowActionReducer from "./rowActionSlice";
export const store = configureStore({
  reducer: {
    rowAction: rowActionReducer,
  },
});

export default store;
