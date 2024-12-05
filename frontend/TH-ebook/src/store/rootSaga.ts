import { all } from 'redux-saga/effects';
import userSaga from "../features/user/userSaga.ts";
import bookSaga from "../features/book/bookSaga.ts";


export default function* rootSaga() {
  console.log('Root saga started');
  yield all([bookSaga(), userSaga()]);
}