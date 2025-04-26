import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CategoriesState, Category } from "./types";
import { createCategory, fetchCategories } from "./categoriesApi";

const initialState: CategoriesState = {
    categories: [],
    status: 'idle'
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
                state.status = 'loading';
            })
            .addCase(postCategory.fulfilled, (state, { payload }) => {
                state.status = 'success';
                state.categories.push(payload);
            })
            .addCase(postCategory.rejected, (state) => {
                state.status = 'fail';
            })
            .addCase(getCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCategories.fulfilled, (state) => {
                state.status = 'success';
                state.categories = [];
            })
            .addCase(getCategories.rejected, (state) => {
                state.status = 'fail';
            });
    }
});

export const categoriesSelector = (state: RootState) => state.categories.categories;
export const categoriesStatusSelector = (state: RootState) => state.categories.status;

export default categoriesSlice.reducer;