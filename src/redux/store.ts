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
export type AppDispatch = typeof store.dispatch


export const dispatch: AppDispatch = store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector