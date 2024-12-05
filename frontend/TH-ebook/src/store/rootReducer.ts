import {combineReducers} from '@reduxjs/toolkit';
import booksReducers from '../features/book/bookSlice.ts';
import userReducer from '../features/user/userSlice';
import {BookStateType} from "../type/BookStateType.ts";
import {Book} from "../models/Book.ts";
import {UserStateType} from "../type/UserStateType.ts";
import {User} from "../models/User.ts";


export type StateType = {
    books: BookStateType<Book[]>;
    newBooks: BookStateType<Book[]>;
    trendingBooks: BookStateType<Book[]>;
    featuredBooks: BookStateType<Book[]>;
    user: UserStateType<User>;
};

const rootReducer = combineReducers({
    newBooks: booksReducers.newBooks,
    trendingBooks: booksReducers.trendingBooks,
    featuredBooks: booksReducers.featuredBooks,
    user: userReducer,
});

export default rootReducer;