export type Category = {
    id: string;
    description: string;
}

export type CategoriesState = {
    categories: Category[];
    status: 'idle' | 'loading' | 'success' | 'fail';
}