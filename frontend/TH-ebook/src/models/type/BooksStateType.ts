import {Book} from "../Book.ts";

export type BooksStateType = {
    data: Book[] | null;
    isLoading: boolean;
    errors: string;
}