import { CreateTask, Task } from "./types";

export const getTasks = (): Promise<Task[]> => {
    return new Promise((resolve) => {
        resolve([]);
    });
}

export const postTask = ({ description, categoryId }: CreateTask): Promise<Task> => {
  return new Promise((resolve) => {
    const isoDate = new Date().toISOString();

    setTimeout(() => {
      resolve({
        id: isoDate,
        categoryId,
        description,
        createdAt: isoDate,
        status: 'todo'
      });
    }, 1500);
  });
}

export const deleteTask = (taskId: Task['id']): Promise<Task['id']> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taskId);
    }, 1500);
  })
}