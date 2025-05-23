import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTask, Task, TasksState, TaskStatus } from "./types";
import { deleteTask, getTasks, postTask } from "./tasksApi";
import {  RootState, ThunkConfig } from "../../app/store";

const initialState: TasksState = {
    tasks: [],
    getStatus: 'idle',
    postStatus: 'idle',
    deleteStatus: 'idle'
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        return await getTasks();
    }
)

export const createTask = createAsyncThunk<Task, CreateTask, ThunkConfig<string>>(
    'tasks/create',
    async (createTaskData: CreateTask, { getState, rejectWithValue }) => {
        const { categories } = getState();

        if (!categories.categories.some((category) => category.id === createTaskData.categoryId)) {
            return rejectWithValue("Selected category doesn't exist");
        }

        return await postTask(createTaskData);
    }
)

export const removeTask = createAsyncThunk<Task['id'], Task['id'], ThunkConfig<string>>(
    'tasks/delete',
    async (taskId: Task['id'], { getState, rejectWithValue }) => {
        const { tasks } = getState();

        if (!tasks.tasks.some((task) => task.id === taskId)) {
            return rejectWithValue("Selected task doesn't exist");
        }

        return await deleteTask(taskId);
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        initializeTasks: (state, { payload }: PayloadAction<Task[]>) => {
            state.getStatus = 'success';
            state.tasks = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.getStatus = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.getStatus = 'success';
                state.tasks = payload;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.getStatus = 'fail';
            })
            .addCase(createTask.pending, (state) => {
                state.postStatus = 'loading';
            })
            .addCase(createTask.fulfilled, (state, { payload }) => {
                state.postStatus = 'success';
                state.tasks.push(payload);
            })
            .addCase(createTask.rejected, (state, {payload}) => {
                state.postStatus = 'fail';

                console.log(payload);
            })
            .addCase(removeTask.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(removeTask.fulfilled, (state, { payload }) => {
                state.deleteStatus = 'success';
                state.tasks = state.tasks.filter((task) => task.id !== payload);
            })
            .addCase(removeTask.rejected, (state, {payload}) => {
                state.deleteStatus = 'fail';

                console.log(payload);
            })
    }
});

export const { initializeTasks } = tasksSlice.actions;

export const tasksSelector = (state: RootState) => state.tasks.tasks;
export const tasksByStatus = (status: TaskStatus) => createSelector([tasksSelector], (tasks) => tasks.filter((task) => task.status === status));

export default tasksSlice.reducer;