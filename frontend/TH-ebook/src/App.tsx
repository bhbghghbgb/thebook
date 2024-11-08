import BookDetailPage from "./pages/BookDetailPage.tsx";
import { useMediaQuery } from "@mui/material";
import HomePage from "./pages/HomePage.tsx";
import { Route, Routes } from "react-router-dom";
import BookListPage from "./pages/BookListPage.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";

function App() {
  // Define the media query
  const isMobile = useMediaQuery("(max-width: 1060px)");

  const books = useSelector((state: RootState) => {
    return state.books;
  });

  return (
    <>
      {/* <div className="App flex flex-grow text-color"> */}
      <div className="App flex flex-col flex-grow w-full h-full">
        <div className="md-content flex-grow">
          <Routes>
            <Route path="/auth">
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
            </Route>
            <Route
              path="/"
              element={<HomePage isMobile={isMobile} books={books} />}
            />
            <Route
              path="/book/:id"
              element={<BookDetailPage books={books} isMobile={isMobile} />}
            />
            <Route
              path="/book/trending"
              element={<BookListPage header={"Trending"}  books={books}/>}
            />
            <Route path="/reader/:id/:pg?" element={<ReaderPage />}></Route>
          </Routes>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;

/* 


h-: Đây là prefix của Tailwind CSS để đặt chiều cao (height) cho một phần tử.
[var(--navbar-height)]: Đây là cú pháp tùy chỉnh của Tailwind CSS để sử dụng giá trị của biến CSS --navbar-height.


*/
