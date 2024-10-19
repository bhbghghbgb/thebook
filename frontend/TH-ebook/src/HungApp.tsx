import { useEffect, useState } from "react";
// import './App.css';
import { Book } from "./models/Book";
import BreakPoint from "./component/HomePage/BreakPoint.tsx";


const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5024/api/Book");
        const data = await response.json();
        setBooks(data);

        console.info("Books fetched:", books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks().then(r => r);
  }, []);

  return (
    <div
      id="root"
      className="m-0 flex place-items-center min-w-[320px] min-h-screen font-pop w-full h-full bg-black"
    >
      <BreakPoint book={books} />
    </div>
  );
};

export default App;
