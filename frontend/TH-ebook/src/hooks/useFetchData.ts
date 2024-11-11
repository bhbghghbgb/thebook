// src/hooks/useFetchData.ts
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../service/api/fetchData';
import {ApiResponse} from "../models/type/ApiResponse.ts";

const useFetchData = <T>(endpoint: string) => {
    return useQuery<ApiResponse<T>, Error>({ queryKey: [endpoint], queryFn: () => fetchData(endpoint) });
};

export default useFetchData;