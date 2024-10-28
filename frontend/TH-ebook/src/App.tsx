import NavBar from "./components/NavBar/NavBar.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import { useMediaQuery } from "@mui/material";
import HomePage from "./pages/HomePage.tsx";

function App() {
  // Define the media query
  const isMobile = useMediaQuery("(max-width: 576px)");

  return (
    <>
      <div className="App flex flex-col flex-grow">
        <div className="h-[var(--navbar-height)]">
          <NavBar isMobile={isMobile} />
        </div>
        {/* <BookDetailPage isMobile={isMobile} /> */}
        {/* <BookDetailTest/> */}
        <HomePage />
      </div>
    </>
  );
}

export default App;

/* 


h-: Đây là prefix của Tailwind CSS để đặt chiều cao (height) cho một phần tử.
[var(--navbar-height)]: Đây là cú pháp tùy chỉnh của Tailwind CSS để sử dụng giá trị của biến CSS --navbar-height.


*/