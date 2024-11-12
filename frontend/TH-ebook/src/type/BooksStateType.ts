import {Book} from "../models/Book.ts";

export type BooksStateType = {
    data: Book[] | null;
    isLoading: boolean;
    errors: string;
}