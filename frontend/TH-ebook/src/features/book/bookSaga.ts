import {all, put, takeLatest} from 'redux-saga/effects';
import {Book} from "../../models/Book.ts";
import {fetchData} from "../../service/api/fetchData.ts";
import {ApiResponse} from "../../type/ApiResponse.ts";
import {Action} from "@reduxjs/toolkit";
import {
    fetchNewBooksRequest,
    fetchNewBooksSuccess,
    fetchNewBooksFailure,
    fetchTrendingBooksRequest,
    fetchTrendingBooksSuccess,
    fetchTrendingBooksFailure,
    fetchFeaturedBooksRequest,
    fetchFeaturedBooksSuccess,
    fetchFeaturedBooksFailure,
    fetchBooksRequest,
    fetchBooksSuccess,
    fetchBooksFailure

} from './bookSlice.ts';
const createBookSaga = (fetchRequest:Action, fetchSuccess:Action, fetchFailure:Action, type:string) => {
    return function* () {
        const endpointBooks = type ? `products/books/type/${type}`: 'products/books';
        try {
            const response: ApiResponse<Book[]> = yield fetchData<Book[]>(endpointBooks);
            console.log("respone", response);
            // Nếu thành công, dispatch action getBooksSuccess với dữ liệu nhận được
            console.log("fetchBooksSaga Data");
            if (response.data) {
                // console.log(responseBooks.data);
                yield put(fetchSuccess(response.data));
            }
            if (response.isError === true) {
                // Nếu có lỗi, dispatch action getBooksFailure với thông báo lỗi
                yield put(fetchFailure(response.detail?.message || "Error loading data"));
            }
        } catch (error) {
            yield put(fetchFailure((error as Error).message));
        }
    };
};

export function* watchBookSagas(
    fetchNewBooksRequest:Action,
    fetchNewBooksSuccess:Action,
    fetchNewBooksFailure:Action,
    fetchTrendingBooksRequest:Action,
    fetchTrendingBooksSuccess:Action,
    fetchTrendingBooksFailure:Action,
    fetchFeaturedBooksRequest:Action,
    fetchFeaturedBooksSuccess:Action,
    fetchFeaturedBooksFailure:Action,
    fetchBooksRequest:Action,
    fetchBooksSuccess:Action,
    fetchBooksFailure:Action
) {
    yield takeLatest(
        fetchNewBooksRequest.type,
        createBookSaga(
            fetchNewBooksRequest,
            fetchNewBooksSuccess,
            fetchNewBooksFailure,
            'New'
        )
    );

    yield takeLatest(
        fetchTrendingBooksRequest.type,
        createBookSaga(
            fetchTrendingBooksRequest,
            fetchTrendingBooksSuccess,
            fetchTrendingBooksFailure,
            'Trending'
        )
    );

    yield takeLatest(
        fetchFeaturedBooksRequest.type,
        createBookSaga(
            fetchFeaturedBooksRequest,
            fetchFeaturedBooksSuccess,
            fetchFeaturedBooksFailure,
            'Featured'
        )
    );

    yield takeLatest(
        fetchBooksRequest.type,
        createBookSaga(
            fetchBooksRequest,
            fetchBooksSuccess,
            fetchBooksFailure,
            ''
        )
    );
}

export default function* bookSaga() {
    yield all([
        watchBookSagas(
            fetchNewBooksRequest,
            fetchNewBooksSuccess,
            fetchNewBooksFailure,
            fetchTrendingBooksRequest,
            fetchTrendingBooksSuccess,
            fetchTrendingBooksFailure,
            fetchFeaturedBooksRequest,
            fetchFeaturedBooksSuccess,
            fetchFeaturedBooksFailure,
            fetchBooksRequest,
            fetchBooksSuccess,
            fetchBooksFailure
        )
    ]);
}