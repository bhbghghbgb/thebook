import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchData} from '../../service/api/fetchData.ts';
import {ApiResponse} from '../../type/ApiResponse.ts';

interface WithFetchDataProps<T> {
    data: T;
}

/*
* P là kiểu props của WrappedComponent
* T là kiểu dữ liệu của dữ liệu fetch được
* */

const withFetchData = <P extends WithFetchDataProps<T>, T>(
    // ComponentType<P> là một generic type, địa diện cho việc một component có kiểu props là P
    WrappedComponent: React.ComponentType<P>, // Component to be wrapped
    endpoint: string, // API endpoint
    queryKey: string | string[] // Query key use for React Query to uniquely identify the query
) => {
    /*
    * props sẽ chứa tất cả các thuộc tính P trừ đi các thuộc tính của WithFetchDataProps<T> (data)
    * vì các thuộc tính này sẽ được truyền vào WrappedComponent sau khi fetch dữ liệu
    * */
    return (props: Omit<P, keyof WithFetchDataProps<T>>) => {

        const {data, isLoading, error} = useQuery<ApiResponse<T>, Error>(
            {
                queryKey: [queryKey],
                queryFn: () => fetchData(endpoint),
            }
        );

        if (isLoading) return (
                <div className="text-2xl">Loading...</div>
        );
        if (error) return (
                <div className="text-2xl text-red-900">Error loading data</div>
        );


        /*
        * Thêm dữ liệu fetch được vào props của WrappedComponent thông qua props `data`
        * Tất cả các props khác sẽ được truyền vào WrappedComponent không thay đổi
        * */
        const componentProps = {
            ...props,
            data: data,
        } as P;

        return <WrappedComponent {...componentProps} />;
    };
};

export default withFetchData;