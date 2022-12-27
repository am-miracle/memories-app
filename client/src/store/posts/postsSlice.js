import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "post",
    initialState: {
        value: [

        ]
    },
    reducers: {
        set: (state, action) => {
            return action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { set } = postsSlice.actions

export default postsSlice.reducer