import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { sleep } from "../Utils/sleep";
import pleerReducer, { setlenght, UserSelectLenght } from './slices/pleerSlice';

export const store = configureStore({
    reducer: {
        pleer: pleerReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector