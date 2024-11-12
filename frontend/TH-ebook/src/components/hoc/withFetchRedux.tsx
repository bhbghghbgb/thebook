import React, {useEffect} from 'react';
import {getBooks} from "../../features/book/bookActions.ts";
import {StateType} from "../../store/rootReducer.ts";
import {useDispatch, useSelector} from "react-redux";

interface WithFetchReduxProps<T> {
    data: T;
}

const withFetchRedux = <P extends WithFetchReduxProps<T>, T>(
    WrappedComponent: React.ComponentType<P> // Component to be wrapped
) => {
    return (props: Omit<P, keyof WithFetchReduxProps<T>>) => {

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



