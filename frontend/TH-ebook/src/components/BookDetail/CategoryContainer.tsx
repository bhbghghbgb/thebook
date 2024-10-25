import {Book} from "../../models/Book.ts";
import {Chip} from "@material-tailwind/react";
import React from "react";

interface CategoryProps {
    book: Book;
    onCategoryClick: (categoryName: string) => void;
}

const CategoryContainer = ({book, onCategoryClick}: CategoryProps) => {
    return (
        <div className="category flex flex-wrap gap-1">
            {book.category.map((category) => (
                <Chip
                    key={category.name}
                    variant="gradient"
                    value={category.name}
                    color="gray"
                    onClick={() => onCategoryClick(category.name)}
                />

            ))}
        </div>
    );
}

export default CategoryContainer;