import { createSlice } from "@reduxjs/toolkit";

import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPost: (state, action) => {
      addDoc(collection(db, "savePost"), { ...action.payload });
      return {
        ...state,
        value: action.payload,
      };
    },
    removePost: (state, action) => {
      deleteDoc(doc(db, "savePost", action.payload));
      return {
        ...state,
        value: action.payload,
      };
    },
    removeApplyPost: (state, action) => {
      deleteDoc(doc(db, "application", action.payload));
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { addPost, removePost, removeApplyPost } = userSlice.actions;
export default userSlice.reducer;
