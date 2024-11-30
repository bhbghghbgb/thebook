// src/hooks/useFetchBook.ts
import {useQuery} from '@tanstack/react-query';
import {fetchData} from '../service/api/fetchData.ts';

const useFetchBook = <T>(endpoint: string, queryKey?: string | string[]) => {
    return useQuery<T, Error>({ queryKey: [queryKey], queryFn: async () => {
            return (await fetchData<T>(endpoint));
        }  });
};

export default useFetchBook;