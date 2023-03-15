import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import {
  authRegisterUser,
  authSignInUser,
  authSignOutUser,
} from "./authOperations.js";

const initialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
      isAuth: true,
    }),
  },

  extraReducers: (builder) =>
    builder
      .addCase(authRegisterUser.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.email = payload.email;
        state.avatar = payload.photoURL;
        state.isAuth = true;
      })
      .addCase(authRegisterUser.rejected, (state, { payload }) => {
        Toast.show({ type: "error", text1: payload });
      })
      .addCase(authSignInUser.fulfilled, (state) => {
        state.isAuth = true;
        Toast.show({ type: "success", text1: `Hello again` });
      })
      .addCase(authSignInUser.rejected, (state, { payload }) => {
        Toast.show({ type: "error", text1: payload });
      })
      .addCase(authSignOutUser.fulfilled, (state) => {
        state.userId = initialState.userId;
        state.login = initialState.login;
        state.email = initialState.email;
        state.avatar = initialState.avatar;
        state.isAuth = initialState.isAuth;
        Toast.show({
          type: "success",
          text1: `See you soon`,
        });
      }),
});

export const { getCurrentUser } = authSlice.actions;
