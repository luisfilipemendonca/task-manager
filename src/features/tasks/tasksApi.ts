import { Task } from "./types";

export const getTasks = (): Promise<Task[]> => {
    return new Promise((resolve) => {
        resolve([{
            id: '1',
            description: 'Buy groceries for the week',
            status: 'todo',
            categoryId: 'personal',
            createdAt: new Date('2025-04-15T10:30:00').toISOString(),
          },
          {
            id: '2',
            description: 'Finish quarterly report',
            status: 'in-progress',
            categoryId: 'work',
            createdAt: new Date('2025-04-16T08:00:00').toISOString(),
          },
          {
            id: '3',
            description: 'Plan weekend trip',
            status: 'completed',
            categoryId: 'personal',
            createdAt: new Date('2025-04-10T18:45:00').toISOString(),
          },
          {
            id: '4',
            description: 'Team sync meeting notes',
            status: 'todo',
            categoryId: 'work',
            createdAt: new Date('2025-04-17T12:00:00').toISOString(),
          },
          {
            id: '5',
            description: 'Schedule dentist appointment',
            status: 'in-progress',
            categoryId: 'health',
            createdAt: new Date('2025-04-12T09:15:00').toISOString(),
          },
          {
            id: '6',
            description: 'Clean the garage',
            status: 'todo',
            categoryId: 'home',
            createdAt: new Date('2025-04-13T14:30:00').toISOString(),
          },
          {
            id: '7',
            description: 'Study TypeScript generics',
            status: 'completed',
            categoryId: 'study',
            createdAt: new Date('2025-04-08T19:20:00').toISOString(),
          }])
    });
}