import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {
    getBooks,
    getBooksSuccess,
    getBooksFailure,
} from './bookActions';
import {Book} from "../../models/Book.ts";
import useFetchData from "../../hooks/useFetchData.ts";
import {ApiResponse} from "../../models/type/ApiResponse.ts";

/* 

function* fetchBooksSaga() { ... }: Đây là một hàm generator, được định nghĩa bằng từ khóa function*. Hàm này sẽ trả về một đối tượng iterator và có thể tạm dừng và tiếp tục thực thi tại các điểm yield.

try { ... } catch (error) { ... }: Khối try-catch được sử dụng để xử lý các lỗi có thể xảy ra

yield call(axios.get, API_URL): Hàm call() được sử dụng để gọi một hàm không đồng bộ. Trong trường hợp này, chúng ta gọi hàm axios.get() để thực hiện một HTTP GET request đến API_URL.

*/


function* fetchBooksSaga(){
    try {
        // Gọi API để lấy dữ liệu sách
        const response: AxiosResponse<ApiResponse<Book[]>, Book[]> = yield call(() => {
            const {data, error} = useFetchData("books");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
        // Nếu thành công, dispatch action getBooksSuccess với dữ liệu nhận được
        yield put(getBooksSuccess(response.data.data));
    } catch (error) {
        // Nếu có lỗi, dispatch action getBooksFailure với thông báo lỗi
        yield put(getBooksFailure(error.message));
    }
}



export function* watchBookData(): Generator<unknown, void, unknown> {
    yield takeLatest(getBooks.type, fetchBooksSaga);
}

export default function* bookSaga(): Generator<unknown, void, unknown> {
    yield all([
        call(watchBookData),
    ]);
}