import {Book} from "../../models/Book.ts";
import {Chip} from "@material-tailwind/react";
import React from "react";

interface AuthorProps {
    book: Book;
    onAuthorClick: (categoryName: string) => void;
}

const AuthorContainer: React.FC<AuthorProps> = ({book, onAuthorClick}) => {
    return (
        <div className="category flex flex-wrap gap-1">
            <h3 className="text-lg font-bold text-black mb-2">Author: </h3>
            {book.authors.map((author) => (
                <div>
                    <Chip
                        key={author.name}
                        variant="gradient"
                        value={author.name}
                        color="gray"
                        onClick={() => onAuthorClick(author.name)}
                        size="sm"
                    />

                </div>
            ))}
        </div>
    );
}

export default AuthorContainer;