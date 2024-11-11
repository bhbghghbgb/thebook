import { all, fork } from 'redux-saga/effects';
import bookSaga from '../features/book/bookSaga';

export default function* rootSaga() {
  yield all([fork(bookSaga)]);
}