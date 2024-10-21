import {Book} from "../models/Book.ts";

function Category({ book }: { book: Book }) {
    return (
        <div className="category mt-3">
            <div className="flex ml-[260px] gap-1">
                {book.category.map((category) => ( // Map over the categories array
                    <span key={category.name} className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
            <a href="" className="text-xs">
              {category.name} {/* Display category name */}
            </a>
          </span>
                ))}
                <span className="w-[300px] h-[15px] rounded flex items-center">
          <svg
              data-v-9ba4cb7e
              data-v-6ebb56e1
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 6.35 6.35"
              className="icon text-blue-500"
          >
            <path
                fill="currentColor"
                d="M4.233 3.175a1.06 1.06 0 0 1-1.058 1.058 1.06 1.06 0 0 1-1.058-1.058 1.06 1.06 0 0 1 1.058-1.058 1.06 1.06 0 0 1 1.058 1.058"
            ></path>
          </svg>
          <span className=" text-sm font-bold">
            Publication: {book.published_year}
          </span>
        </span>
            </div>
        </div>
    );
}export default Category;