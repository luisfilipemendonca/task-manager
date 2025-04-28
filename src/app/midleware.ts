import { Middleware } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { initializeCategories, postCategory } from "../features/categories/categoriesSlice";
import { Category } from "../features/categories/types";
import { Task } from "../features/tasks/types";
import { createTask, initializeTasks } from "../features/tasks/tasksSlice";

const storageKeys = {
    CATEGORIES: 'task-manager-categories',
    TASKS: 'task-manager-tasks'
} as const;

type StorageKey = keyof typeof storageKeys;

type Storage = {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
}

const getLocalstorageData = <T, >(key: StorageKey, storage: Storage): T[] => {
    try {
        const storedData = storage.getItem(storageKeys[key]);

        if (!storedData) return [];

        return JSON.parse(storedData);
    } catch(err) {
        console.warn(`Error parsing localStorage key "${key}":`, err);
        return [];
    }
}

const saveLocalstorageData = <T,>(key: StorageKey, data: T[], storage: Storage) => {
    storage.setItem(storageKeys[key], JSON.stringify(data));
}

let isHydrated = false;

export const localStorageSyncMiddleware = (storage: Storage): Middleware => (store) => (next) => (action) => {
    const result = next(action);

    const { categories, tasks }: RootState = store.getState();

    if (!isHydrated) {
        isHydrated = true;

        if (categories.getStatus === 'idle') {
            store.dispatch(initializeCategories(getLocalstorageData<Category>("CATEGORIES", storage)));
        }
    
        if (tasks.getStatus === 'idle') {
            store.dispatch(initializeTasks(getLocalstorageData<Task>('TASKS', storage)));
        }
    }

    if (postCategory.fulfilled.match(action)) {
        saveLocalstorageData("CATEGORIES", categories.categories, storage);
    }

    if (createTask.fulfilled.match(action)) {
        saveLocalstorageData("TASKS", tasks.tasks, storage);
    }

    return result;
}