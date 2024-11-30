import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getBooksAction,
  getBooksSuccessAction,
  getBooksFailureAction,
} from "./bookSlice.ts";
import { Book } from "../../models/Book.ts";
import {fetchData} from "../../service/api/fetchData.ts";

/* 

function* fetchBooksSaga() { ... }: Đây là một hàm generator, được định nghĩa bằng từ khóa function*. Hàm này sẽ trả về một đối tượng iterator và có thể tạm dừng và tiếp tục thực thi tại các điểm yield.

try { ... } catch (error) { ... }: Khối try-catch được sử dụng để xử lý các lỗi có thể xảy ra

yield call(axios.get, API_URL): Hàm call() được sử dụng để gọi một hàm không đồng bộ. Trong trường hợp này, chúng ta gọi hàm axios.get() để thực hiện một HTTP GET request đến API_URL.

*/

function* fetchBooksSaga() {
  const endpoint = "books";
  try {
    // Gọi API để lấy dữ liệu sách
    const response: Book[] = yield fetchData(endpoint);
    // Nếu thành công, dispatch action getBooksSuccess với dữ liệu nhận được
    console.log("fetchBooksSaga Data");
    if (response) {
      // console.log(response.data);
      yield put(getBooksSuccessAction(response));
    }
  } catch (error: unknown) {
    // Nếu có lỗi, dispatch action getBooksFailure với thông báo lỗi
    yield put(getBooksFailureAction((error as Error).message));
  }
}

export function* watchFetchBookData() {
  // Lắng nghe action getBooksAction và gọi hàm fetchBooksSaga khi action được dispatch
  yield takeLatest(getBooksAction.type, fetchBooksSaga);
}

export default function* bookSaga(): Generator<unknown, void, unknown> {
  yield all([call(watchFetchBookData)]);
}
