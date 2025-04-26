import { createSlice } from "@reduxjs/toolkit";

type Category = {
    id: string;
    description: string;
}

type CategoriesState = {
    categories: Category[];
    status: 'idle' | 'loading' | 'success' | 'fail';
}

const initialState: CategoriesState = {
    categories: [],
    status: 'idle'
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {}
});

export default categoriesSlice.reducer;