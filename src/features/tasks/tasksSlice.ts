import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksState } from "./types";
import { getTasks } from "./tasksApi";

const initialState: TasksState = {
    tasks: [],
    status: 'idle'
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        return await getTasks();
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.status = 'success';
                state.tasks = payload;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.status = 'fail';
            });
    }
});

export default tasksSlice.reducer;