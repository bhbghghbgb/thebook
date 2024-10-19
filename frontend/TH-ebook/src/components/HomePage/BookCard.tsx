// src/ProductCard.jsx
import {Book} from "../../models/Book.ts";

const BookCard = ({book}: { book: Book }) => {
    console.log("Book in card: ", book);

    return (
        <div className="relative overflow-hidden group">
            <div
                id="book-info"
                className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 transition-transform transform group-hover:translate-y-[-10px]">
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm">{
                    book.authors.map(author => author).join(", ")
                }</p>
                <p className="text-sm">{book.published_year}</p>
            </div>
            <img
                id="book-cover"
                className="w-full h-auto block"
                src={book.cover_image}
                alt={book.title}
            />
        </div>
    );
};

export default BookCard;
