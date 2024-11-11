import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/book/bookSlice.ts';
import userReducer from "../features/user/userSlice.ts";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga.ts";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;