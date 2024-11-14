import {Typography} from "@material-tailwind/react";
import {Book} from "../../models/Book";
import TagComponent from "../BookDetail/TagComponent.tsx";
import RatingsContainer from "../BookDetail/RatingsContainer";

interface Props {
    books: Book[];
    onClick: (bookId: string) => void;
    isLoading: boolean;
    errors: string;
}

const BookListContainer = ({books, onClick, isLoading, errors}: Props) => {
    if (isLoading) {
        return <div className="text-2xl">Loading...</div>;
    }
    if (errors) {
        return <div className="text-2xl text-red-900">Error loading data</div>;
    }

    return (
        <>
            <div className="grid gap-y-2">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="manga-card grid grid-areas-product-list grid-cols-[84px auto 1fr auto auto] bg-gray-800"
                        onClick={() => onClick(book.id)}
                    >
                        <img
                            className="cover grid-in-cover w-35 h-40 mr-5"
                            src={book.cover_image}
                            alt={book.title}
                        />
                        <Typography
                            className="font-bold title grid-in-title text-4xl lg:text-3xl md:text-2xl sm:text-xl"
                            variant="h2" placeholder={undefined} onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            {book.title}
                        </Typography>
                        <div className="author grid-in-author p-5">
                            <TagComponent
                                content={book.authors.map((author) => author.name)}
                                onContainerClick={(authorName) =>
                                    console.log(`Author clicked: ${authorName}`)
                                }
                            />
                        </div>
                        <div className="rating grid-in-stats">
                            <RatingsContainer/>
                        </div>
                        <div className="tags grid-in-tags">
                            <TagComponent
                                content={book.category.map((category) => category.name)}
                                onContainerClick={(categoryName) =>
                                    console.log(`Category clicked: ${categoryName}`)
                                }
                            />
                        </div>
                        <Typography
                            className="description py-2  grid-in-description" placeholder={undefined}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {book.description}
                        </Typography>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BookListContainer;
