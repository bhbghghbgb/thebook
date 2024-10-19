// src/ProductList.jsx
import { Book } from "../../models/Book.ts";
import ProductCard from "./BookCard.tsx";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="product-list">
      {books.map((book) => (
        <ProductCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
