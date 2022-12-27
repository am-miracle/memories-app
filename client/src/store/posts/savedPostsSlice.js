import { createSlice } from "@reduxjs/toolkit";

export const savedPostsSlice = createSlice({
    name: "savedPosts",
    initialState: [],
    reducers: {
      add: (state, action) => {
        // get the payload object from by destructuring the action parameter
        //  assign value of payload to book
        const { payload: post } = action;
        return [...state, post];
      },
      remove: (state, action) => {
        // get the payload object from by destructuring the action parameter
        //  assign value of payload to bok
        const { payload: post } = action;
        const postIndex = state.findIndex((x) => x.title === post.title);
        // if no match, return the previous state
        if (postIndex < 0) return state;
        // avoid mutating the original state, create a copy
        const stateUpdate = [...state];
        // then splice it out from the array
        stateUpdate.splice(postIndex, 1);
        return stateUpdate;
      }
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { add, remove } = savedPostsSlice.actions;
  
  export default savedPostsSlice.reducer;