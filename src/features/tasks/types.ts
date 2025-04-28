import { AsyncStatus } from "../../shared/types";

export type TaskStatus = 'todo' | 'progress' | 'completed';

export type Task = {
    id: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
    categoryId: string;
}

export type CreateTask = {
    description: Task['id'];
    categoryId: Task['categoryId'];
}

export type TasksState = {
    tasks: Task[];
    getStatus: AsyncStatus;
    postStatus: AsyncStatus;
}

export type TasksStatusGrid = {
    title: string;
    status: TaskStatus;
};