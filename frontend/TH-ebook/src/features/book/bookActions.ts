import { createAction } from '@reduxjs/toolkit';
import { Book } from '../../models/Book';

export const getBooks = createAction('books/getBooks');
export const getBooksSuccess = createAction<Book[]>('books/getBooksSuccess');
export const getBooksFailure = createAction<string>('books/getBooksFailure');

export const addBookToLibrary = createAction<Book>('books/addBookToLibrary');
export const addBookToLibrarySuccess = createAction<Book>('books/addBookToLibrarySuccess');
export const addBookToLibraryFailure = createAction<string>('books/addBookToLibraryFailure');