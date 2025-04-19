export type Task = {
    id: string;
    description: string;
    status: 'todo' | 'in-progress' | 'completed';
    createdAt: string;
    categoryId: string;
}

export type TasksState = {
    tasks: Task[];
    status: 'idle' | 'loading' | 'success' | 'fail';
}