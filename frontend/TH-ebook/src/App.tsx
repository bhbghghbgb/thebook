// src/App.tsx
import { useMediaQuery } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BookDetailPage from "./pages/BookDetailPage";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ReaderPage from "./pages/ReaderPage";

const queryClient = new QueryClient();

function App() {
    // Define the media query
    const isMobile = useMediaQuery("(max-width: 1060px)");
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App flex flex-col flex-grow w-full h-full">
                <div className="md-content flex-grow">
                    <Routes>
                        <Route path="*" element={"404 Not Found"}></Route>
                        <Route path="/auth">
                            <Route path="signup" element={<SignUpPage />} />
                            <Route path="signin" element={<SignInPage />} />
                        </Route>
                        <Route
                            path="/"
                            element={<BookListPage header="Trending" />}
                        />
                        <Route
                            path="/book/:id"
                            element={<BookDetailPage isMobile={isMobile} />}
                        />
                        <Route
                            path="/book/trending"
                            element={<BookListPage header="Trending" />}
                        />
                        <Route path="/reader/:id/:pg?" element={<ReaderPage />}></Route>
                    </Routes>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;