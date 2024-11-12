import React, {useEffect} from 'react';
import {getBooks} from "../../features/book/bookActions.ts";
import {StateType} from "../../store/rootReducer.ts";
import {useDispatch, useSelector} from "react-redux";

interface WithFetchSagaProps<T> {
    data: T;
}

const withFetchRedux = <T, P extends WithFetchSagaProps<T>>(
    WrappedComponent: React.ComponentType<P> // Component to be wrapped
) => {
    return (props: Omit<P, keyof WithFetchSagaProps<T>>) => {

        const dispatch = useDispatch();
        const {data, errors, isLoading} = useSelector((state: StateType) => state.books);

        useEffect(() => {
            dispatch(getBooks());
        }, [dispatch]);


        if (isLoading) return (
                <div className="text-2xl">Loading...</div>
        );
        if (errors) return (
                <div className="text-2xl text-red-900">Error loading data</div>
        );

        const componentProps = {
            ...props,
            data: data,
        } as P;

        return <WrappedComponent {...componentProps} />;
    }
}

export default withFetchRedux;



