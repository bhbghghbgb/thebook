import BookDetailPage from "./pages/BookDetailPage.tsx";
import {useMediaQuery} from "@mui/material";
import HomePage from "./pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import BookListPage from "./pages/BookListPage.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    // Define the media query
    const isMobile = useMediaQuery("(max-width: 1060px)");


    const books = useSelector((state: RootState) => {
        return state.books;
    });

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {/* <div className="App flex flex-grow text-color"> */}
            <div className="App flex flex-col flex-grow w-full h-full">
                <div className="md-content flex-grow">
                    <Routes>
                        <Route path="*" element={"404 Not Found"}></Route>
                        <Route path="/auth">
                            <Route path="signup" element={<SignUpPage/>}/>
                            <Route path="signin" element={<SignInPage/>}/>
                        </Route>
                        <Route
                            path="/"
                            element={<HomePage isMobile={isMobile} books={books}/>}
                        />
                        <Route
                            path="/book/:id"
                            element={<BookDetailPage isMobile={isMobile}/>}
                        />
                        <Route
                            path="/book/trending"
                            element={<BookListPage header={"Trending"}/>}
                        />
                        <Route path="/reader/:id/:pg?" element={<ReaderPage/>}></Route>
                    </Routes>
                </div>
            </div>
            {/* </div> */}
        </QueryClientProvider>
    );
}

export default App;

/* 


h-: Đây là prefix của Tailwind CSS để đặt chiều cao (height) cho một phần tử.
[var(--navbar-height)]: Đây là cú pháp tùy chỉnh của Tailwind CSS để sử dụng giá trị của biến CSS --navbar-height.


*/
