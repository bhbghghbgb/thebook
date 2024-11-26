// src/hooks/useFetchBook.ts
import { useQuery } from '@tanstack/react-query';
import { fetchBook } from '../service/api/fetchBook.ts';

const useFetchBook = <T>(endpoint: string, queryKey?: string | string[]) => {
    return useQuery<T, Error>({ queryKey: [queryKey], queryFn: () => fetchBook(endpoint) });
};

export default useFetchBook;