import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksAction } from '../features/book/bookSlice';
import { StateType } from '../store/rootReducer';

export const useBooksRedux = () => {
    const dispatch = useDispatch();

    const { data, errors, isLoading } = useSelector(
        (state: StateType) => state.books
    );

    useEffect(() => {
        console.log('Action type:', getBooksAction.type);
        console.log('Dispatching action:', getBooksAction());
        dispatch(getBooksAction());
    }, []);


    return {
        books: data || [],
        errors,
        isLoading,
    };
};

export default useBooksRedux;