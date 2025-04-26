import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../features/tasks/tasksSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        categories: categoriesReducer
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];