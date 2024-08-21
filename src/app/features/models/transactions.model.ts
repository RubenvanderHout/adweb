import { Category } from "./category.model";

export interface Transaction {
    id : string,
    cost: number,
    createdAt: Date,
    currentCategory: Category
}