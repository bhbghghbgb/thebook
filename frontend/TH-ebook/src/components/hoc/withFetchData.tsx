import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchData} from '../../service/api/fetchData.ts';
import {ApiResponse} from '../../models/type/ApiResponse.ts';

interface WithFetchDataProps<T> {
  isLoading: boolean;
  error: Error | null;
  data: T;
}

const withFetchData = <P extends WithFetchDataProps<T>, T>(
  WrappedComponent: React.ComponentType<P>, // Component to be wrapped
  endpoint: string, // API endpoint
  queryKey: string | string[] // Query key use for React Query to uniquely identify the query
) => {
  return (props: Omit<P, keyof WithFetchDataProps<T>>) => {

    const { data, isLoading, error } = useQuery<ApiResponse<T>, Error>(
        {
          queryKey: [queryKey],
          queryFn: () => fetchData(endpoint),
        }
    );

    console.log(data);

    const componentProps = {
      ...props,
      data: data,
      isLoading,
      error,
    } as P;

    return <WrappedComponent {...componentProps} />;
  };
};

export default withFetchData;