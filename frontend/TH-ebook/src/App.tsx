import NavBar from "./components/NavBar/NavBar.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import {useMediaQuery} from "@mui/material";
import HomePage from "./pages/HomePage.tsx";
import {Category} from "./models/Category.ts";
import {Route, BrowserRouter as Router, Routes, BrowserRouter} from "react-router-dom";
import {Book} from "./models/Book.ts";
import BookListPage from "./pages/BookListPage.tsx";

function App() {
    // Define the media query
    const isMobile = useMediaQuery("(max-width: 1060px)");

    const categories: Category[] = [
        {name: "Action"},
        {name: "Adventure"},
        {name: "Comedy"},
        {name: "Drama"},
        {name: "Fantasy"},
        {name: "Horror"},
        {name: "Mystery"},
        {name: "Romance"},
        {name: "Sci-Fi"},
        {name: "Thriller"},
        {name: "Western"},
        {name: "Biography"},
        {name: "Cookbook"},
    ];

    const books: Book[] = [
        {
            id: "123456789",
            title: "Fuck Microsoft",
            description:
                'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
            cover_image:
                "https://img.perlego.com/book-covers/778577/9781451648553_300_450.webp",
            file_path: "dede",
            published_year: 2023,
            language: "vi",
            created_at: "2024-10-10T08:31:36.732Z",
            updated_at: "2024-10-10T08:31:36.732Z",
            authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
            coins: 50,
            category: categories,
        },
        {
            id: "123456781",
            title: "Fuck Apple",
            description:
                'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
            cover_image:
                "https://img.perlego.com/book-covers/3427220/9788858436059_300_450.webp",
            file_path: "dede",
            published_year: 2023,
            language: "vi",
            created_at: "2024-10-10T08:31:36.732Z",
            updated_at: "2024-10-10T08:31:36.732Z",
            authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
            coins: 50,
            category: categories,
        },
        {
            id: "123456782",
            title: "Fuck Facebook",
            description:
                'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
            cover_image:
                "https://img.perlego.com/book-covers/4168677/thumbnail_9780313351280.jpg",
            file_path: "dede",
            published_year: 2023,
            language: "vi",
            created_at: "2024-10-10T08:31:36.732Z",
            updated_at: "2024-10-10T08:31:36.732Z",
            authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
            coins: 50,
            category: categories,
        },
        {
            id: "123456785",
            title: "Fuck Google",
            description:
                'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
            cover_image:
                "https://img.perlego.com/book-covers/2193445/9781351768290_300_450.webp",
            file_path: "dede",
            published_year: 2023,
            language: "vi",
            created_at: "2024-10-10T08:31:36.732Z",
            updated_at: "2024-10-10T08:31:36.732Z",
            authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
            coins: 50,
            category: categories,
        },
    ];

    return (
        <>
            {/* <div className="App flex flex-grow text-color"> */}
            <div className="App flex flex-col flex-grow">
                <div className="h-[var(--navbar-height)]">
                    <NavBar isMobile={isMobile}/>
                </div>
                <div className="md-content flex-grow">
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={<HomePage isMobile={isMobile} books={books}/>}
                            />
                            <Route
                                path="/book/:id"
                                element={<BookDetailPage books={books} isMobile={isMobile}/>}
                            />
                            <Route
                                path="/book/trending"
                                element={<BookListPage header={"Trending"}/>}
                            />
                        </Routes>
                    </BrowserRouter>
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
