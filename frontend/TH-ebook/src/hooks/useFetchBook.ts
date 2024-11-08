import { useQuery } from 'react-query';
import axios from 'axios';
import { Book } from '../models/Book';

const fetchBooks = async (url: string): Promise<Book[]> => {
  const response = await axios.get(
      url,
  );
  return response.data;
};

const fetchBook = async (url: string): Promise<Book> => {
    const response = await axios.get(url);
    return response.data;
};

export const useFetchBooks = () => {
  return useQuery<Book[], Error>('books', () => fetchBooks("http://localhost:5024/api/Book"));
};

export const useFetchBook = (id: string) => {
    return useQuery<Book, Error>(['book', id], () => fetchBook(`http://localhost:5024/api/Book/${id}`));
}

