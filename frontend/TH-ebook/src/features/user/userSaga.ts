import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { addUserSuccess, addUserFailure } from './userSlice';

function* addUserSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5024/api/User', action.payload);
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(addUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest('user/addUserRequest', addUserSaga);
}