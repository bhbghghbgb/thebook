import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../store/rootReducer.ts";

interface WithReduxDataProps<T> {
    data: T;
}

const withReduxData = <P extends WithReduxDataProps<T>, T>(
    WrappedComponent: React.ComponentType<P>
) => {
    return (props: Omit<P, keyof WithReduxDataProps<T>>) => {
        const { data, errors, isLoading } = useSelector(
            (state: StateType) => state.books
        );

        console.log('data in HOC:', data);

        if (isLoading) {
            return <div className="text-2xl">Loading...</div>;
        }

        if (errors) {
            return <div className="text-2xl text-red-900">Error loading data</div>;
        }

        const componentProps = {
            ...props,
            data
        } as P;

        return <WrappedComponent {...componentProps} />;
    };
};

export default withReduxData;
