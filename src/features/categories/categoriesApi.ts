import { Category } from "./types";

export const fetchCategories = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

export const createCategory = (description: Category['description']): Promise<Category> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: new Date().toISOString(), description })
        }, 2000);
    });
}