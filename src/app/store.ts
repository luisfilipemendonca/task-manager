import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../features/tasks/tasksSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import { localStorageSyncMiddleware } from "./midleware";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        categories: categoriesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageSyncMiddleware(localStorage))
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type ThunkConfig<T> = {
    state: RootState,
    rejectWithValue: T;
}