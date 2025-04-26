import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    reducers: {},
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
            .addCase(getCategories.pending, (state) => {
                state.getStatus = 'loading';
            })
            .addCase(getCategories.fulfilled, (state) => {
                state.getStatus = 'success';
                state.categories = [];
            })
            .addCase(getCategories.rejected, (state) => {
                state.getStatus = 'fail';
            });
    }
});

export const categoriesSelector = (state: RootState) => state.categories.categories;
export const getCategoriesStatus = (state: RootState) => state.categories.getStatus;
export const postCategoriesStatus = (state: RootState) => state.categories.postStatus;

export default categoriesSlice.reducer;