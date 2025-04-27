import { Middleware } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { initializeCategories, postCategory } from "../features/categories/categoriesSlice";
import { Category } from "../features/categories/types";

const CATEGORIES_KEY = 'task-manager-categories';

let isHydrated = false;

export const localStorageSyncMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    const { categories }: RootState = store.getState();

    if (!isHydrated) {
        isHydrated = true;

        if (!categories.categories.length) {
            const storedCategories = localStorage.getItem(CATEGORIES_KEY);
            let parsedCategories: Category[] = [];

            if (storedCategories) {
                parsedCategories = JSON.parse(storedCategories);
            }
    
            store.dispatch(initializeCategories(parsedCategories));
        }
    }

    if (postCategory.fulfilled.match(action)) {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories.categories));
    }

    return result;
}