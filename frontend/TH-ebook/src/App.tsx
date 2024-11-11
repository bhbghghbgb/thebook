import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import BookListPage from "./pages/BookListPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { RootState } from "./store/store.ts";
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
        {!location.pathname.startsWith("/auth") && (
          <div className="h-[var(--navbar-height)] outline-none outline-amber-900">
            <NavBar isMobile={isMobile} />
          </div>
        )}
        <div className="md-content flex-grow">
          <Routes>
            <Route path="*" element={"404 Not Found"}></Route>
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
              element={<BookListPage header={"Trending"} books={books} />}
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
