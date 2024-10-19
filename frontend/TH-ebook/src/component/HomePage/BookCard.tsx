// src/ProductCard.jsx
import { Book } from "../../models/Book.ts";
const ProductCard = ({ book }: { book: Book }) => {
    return (
        <div className="relative overflow-hidden">
            <div
                className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 transition-transform transform hover:translate-y-[-10px]">
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm">{book.authors.map(author => author.name).join(", ")}</p>
                <p className="text-sm">{book.published_year}</p>
            </div>
            <img
                className="w-full h-auto block"
                src={book.cover_image}
                alt={book.title}
            />
        </div>
    );
};

export default ProductCard;
