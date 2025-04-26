import { AsyncStatus } from "../../shared/types";

export type Category = {
    id: string;
    description: string;
}

export type CategoriesState = {
    categories: Category[];
    getStatus: AsyncStatus;
    postStatus: AsyncStatus;
}