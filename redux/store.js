import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice.js";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});
