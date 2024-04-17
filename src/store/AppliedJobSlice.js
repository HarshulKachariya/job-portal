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

// export const { addPost, removePost } = userSlice.actions;

// export const savePostToFirestore = (postData) => async (dispatch) => {
//   try {
//     const docRef = await addDoc(collection(db, "savePost"), postData);
//     dispatch(addPost({ id: docRef.id, ...postData }));
//   } catch (error) {
//     console.error("Error saving post:", error);
//   }
// };

// export const deletePostFromFirestore = (postId) => async (dispatch) => {
//   try {
//     await deleteDoc(doc(db, "savePost", postId));
//     dispatch(removePost(postId));
//   } catch (error) {
//     console.error("Error deleting post:", error);
//   }
// };

// export default userSlice.reducer;

// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// // Define an async thunk to handle the asynchronous operation of adding a document to Firestore
// const addPost = createAsyncThunk("user/addPost", async (postData) => {
//   // Add the document to the "savePost" collection in Firestore
//   const docRef = await addDoc(collection(db, "savePost"), postData);
//   return docRef.id; // Return the ID of the newly added document
// });

// const initialState = {
//   value: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // You can remove this reducer as it's not needed for adding data
//   },
//   extraReducers: (builder) => {
//     // Add an extra reducer to handle the fulfilled action of the async thunk
//     builder.addCase(addPost.fulfilled, (state, action) => {
//       // Update the state with the new value (if needed)
//       state.value = action.payload;
//     });
//   },
// });

// export default userSlice.reducer;

// // Export the async thunk for use in components
// export { addPost };
