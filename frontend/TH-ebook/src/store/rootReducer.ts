import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from '../features/book/bookSlice';
import userReducer from '../features/user/userSlice';
import {BooksStateType} from "../type/BooksStateType.ts";

export type StateType = {
  books: BooksStateType;
};

const rootReducer = combineReducers({
  books: bookReducer,
  user: userReducer,
});

export default rootReducer;