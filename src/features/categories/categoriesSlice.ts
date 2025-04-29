import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CategoriesState, Category } from "./types";
import { createCategory, fetchCategories } from "./categoriesApi";

const initialState: CategoriesState = {
    categories: [],
    getStatus: 'idle',
    postStatus: 'idle'
};

export const postCategory = createAsyncThunk(
    'categories/create',
    async (description: Category['description']) => {
        return await createCategory(description);
    }
)

export const getCategories = createAsyncThunk(
    'categories/get',
    async () => {
        return await fetchCategories();
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        initializeCategories: (state, { payload = [] }: PayloadAction<Category[]>) => {
            state.getStatus = 'success';
            state.categories = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postCategory.pending, (state) => {
                state.postStatus = 'loading';
            })
            .addCase(postCategory.fulfilled, (state, { payload }) => {
                state.postStatus = 'success';
                state.categories.push(payload);
            })
            .addCase(postCategory.rejected, (state) => {
                state.postStatus = 'fail';
            })
    }
});

export const categoriesSelector = (state: RootState) => state.categories.categories;
export const getCategoriesStatus = (state: RootState) => state.categories.getStatus;
export const postCategoriesStatus = (state: RootState) => state.categories.postStatus;

const categoryByKeyCache = new Map<string, ReturnType<typeof createSelector>>();

export const getCategoryBy = <K extends keyof Category, >(key: K, value: Category[K]): ((state: RootState) => Category | undefined) => {
    const cacheKey = `${key}:${value}`;

    if (!categoryByKeyCache.has(cacheKey)) {
        const selectorResult = createSelector([categoriesSelector], (categories) => categories.find((category) => category[key] === value));

        categoryByKeyCache.set(cacheKey, selectorResult);
    }
    
    return categoryByKeyCache.get(cacheKey);
}

export const { initializeCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;