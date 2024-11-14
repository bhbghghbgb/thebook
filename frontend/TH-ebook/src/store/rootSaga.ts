import { all } from 'redux-saga/effects';
import {watchFetchBookData} from '../features/book/bookSaga';

export default function* rootSaga() {
  console.log('Root saga started');
  yield all([watchFetchBookData()]);
}