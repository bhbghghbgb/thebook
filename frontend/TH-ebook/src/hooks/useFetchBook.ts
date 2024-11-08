// src/hooks/useFetchData.ts
import { useQuery } from 'react-query';
import api  from '../service/api/fetchData.ts';

const useFetchData = (url: string) => {
    return useQuery([url], () => api(url));
};

export default useFetchData;