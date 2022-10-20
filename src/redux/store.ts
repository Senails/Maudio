import { configureStore } from "@reduxjs/toolkit";
import pleerReducer from './slices/pleerSlice';

export const store = configureStore({
    reducer: {
        pleer: pleerReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch