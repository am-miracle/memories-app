import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';
import savedPostsReducer from './posts/savedPostsSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        savedPosts: savedPostsReducer,
    }
})