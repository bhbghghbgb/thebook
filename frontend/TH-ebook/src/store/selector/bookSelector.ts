import { RootState } from '../store';
import { Book } from '../../models/Book';

export const selectBooks = (state: RootState): Book[] => state.books.books;

export const selectBookById = (bookId: string) => (state: RootState): Book | undefined =>
  state.books.books.find(book => book.id === bookId);