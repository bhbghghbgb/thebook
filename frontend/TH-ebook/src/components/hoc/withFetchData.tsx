import React from 'react';
import { useQuery } from 'react-query';
import { fetchData } from '../../service/api/fetchData.ts';
import { ApiResponse } from '../../models/type/ApiResponse.ts';

interface WithFetchDataProps {
  isLoading: boolean;
  error: Error | null;
  data: any;
}

const withFetchData = <P extends WithFetchDataProps>(
  WrappedComponent: React.ComponentType<P>, // Component to be wrapped
  endpoint: string, // API endpoint
  queryKey: string | string[] // Query key use for React Query to uniquely identify the query
) => {
  return (props: Omit<P, keyof WithFetchDataProps>) => {
    const { data, isLoading, error } = useQuery<ApiResponse<any>, Error>(
      queryKey,
      async () => {
        const response = await fetchData(endpoint);
        return response.data;
      }
    );

    const componentProps = {
      ...props,
      data: data?.data,
      isLoading,
      error,
    } as P;

    return <WrappedComponent {...componentProps} />;
  };
};

export default withFetchData;