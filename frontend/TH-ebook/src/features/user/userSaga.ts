import {all, put, takeLatest} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
import {authFailure, authSusccess, signIn, signUp} from './userSlice';
import {User} from "../../models/User.ts";
import {Action} from "redux-saga";

// Định nghĩa signUp và signIn saga có kiểu dữ liệu payload cụ thể

const API_URL = import.meta.env.REACT_APP_API_URL;
function* signUpUserSaga({payload: user}: Action & { payload: User }) {
    try {
        const response: AxiosResponse<User> = yield axios.post( `${API_URL}/customer` , user);
        yield put(authSusccess(response.data));
    } catch (error: unknown) {
        yield put(authFailure((error as Error).message));
    }
}

function* signInUserSaga({payload: {username, password}}: Action & { payload: { username: string, password: string } }) {
    try {
        const response: AxiosResponse<User[]> = yield axios.get(`${API_URL}/customer`);
        const user: User | undefined = response.data.find((user) => (user.username === username || user.email === username) && user.password === password);
        if (user) {
            yield put(authSusccess(user));
        } else {
            yield put(authFailure('User not found'));
        }
    } catch (error: unknown) {
        yield put(authFailure((error as Error).message));
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(signUp.type, signUpUserSaga),
        takeLatest(signIn.type, signInUserSaga),
    ]);
}