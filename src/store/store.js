import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./AppliedJobSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
