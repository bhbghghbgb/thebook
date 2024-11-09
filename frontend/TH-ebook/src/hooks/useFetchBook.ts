// src/hooks/useFetchData.ts
import { useQuery } from 'react-query';
import {fetchData}  from '../service/api/fetchData.ts';

const useFetchData = (url: string) => {
    return useQuery([url], () => fetchData(url));
};

export default useFetchData;