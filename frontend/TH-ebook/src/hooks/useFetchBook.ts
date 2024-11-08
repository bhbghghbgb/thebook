import { useQuery } from 'react-query';
import { fetchBooks, fetchBook } from '../service/api/bookAPI';

export const useFetchBooks = () => {
    return useQuery('books', fetchBooks);
};

export const useFetchBook = (bookId: string) => {
    return useQuery(['book', bookId], () => fetchBook(bookId), {
        enabled: !!bookId,
    });
};