import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config.js";

export const authRegisterUser = createAsyncThunk(
  "auth/registerUser",
  async (newUserData, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUserData.email,
        newUserData.password
      );

      await updateProfile(auth.currentUser, {
        displayName: newUserData.login,
        photoURL: newUserData.avatar,
      });

      const { uid, displayName, email, photoURL } = auth.currentUser;

      return { uid, displayName, email, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  "auth/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { uid, displayName, email, photoURL } =
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

      return { uid, displayName, email, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
