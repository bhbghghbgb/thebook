import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book} from '../../models/Book';
import {BooksStateType} from "../../type/BooksStateType.ts";


const initialState: BooksStateType = {
    data: null,
    isLoading: false,
    errors: '',
};

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getBooks(state: BooksStateType) {
            state.isLoading = true;
            state.errors = ''
        },
        getBooksSuccess(state, {payload: books}: PayloadAction<Book[]>) {
            state.data = books;
            state.isLoading = false;
        },
        getBooksFailure(state, {payload: error}: PayloadAction<string>) {
            state.errors = error;
            state.isLoading = false;
        },
    },
});


export const {
    getBooks,
    getBooksSuccess,
    getBooksFailure
} = bookSlice.actions;

export default bookSlice.reducer;