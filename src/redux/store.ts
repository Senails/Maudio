import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pleerReducer from './slices/pleerSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        pleer: pleerReducer,
        search: searchReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const dispatch: AppDispatch = store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector