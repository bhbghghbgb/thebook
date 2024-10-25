import {Book} from "../../models/Book.ts";
import CategoryContainer from "./CategoryContainer.tsx";
import RatingsContainer from "./RatingsContainer.tsx";
import AuthorContainer from "./AuthorContainer.tsx";
import TitleContainer from "./TitleContainer.tsx";
import ButtonGroupContainer from "./ButtonGroupContainer.tsx";
import TabDefault from "./TabDefault.tsx";


interface BookDetailProps {
    book: Book;
    onAddToLibrary: () => void;
    onPreview: () => void;
    onPreoder: () => void;
    onSub: () => void;
    onCategoryClick: (categoryName: string) => void;
    onAuthorClick: (authorName: string) => void;
}

const BookDetail = ({
                        book,
                        onAddToLibrary,
                        onPreview,
                        onPreoder,
                        onSub,
                        onCategoryClick,
                        onAuthorClick
                    }: BookDetailProps) => {
    return (
        <>
            <div>
                {/* Container */}
                <div className="container flex">
                    <div className="nav-l ">
                        <img
                            src={book.cover_image}
                            alt=""
                            className="w-52 h-80 object-cover"
                        />
                    </div>
                    <div className="nav-r ml-2 flex-col space-y-4 text-left">
                        {/*Tile*/}
                        <TitleContainer book={book}/>
                        {/*ButtonGroup*/}
                        <ButtonGroupContainer
                            onAddToLibrary={onAddToLibrary}
                            onPreview={onPreview}
                            onPreoder={onPreoder}
                            onSub={onSub}
                        />
                        {/* category */}
                        <CategoryContainer book={book} onCategoryClick={onCategoryClick}/>
                        {/* rating */}
                        <RatingsContainer/>
                        <p className="story-description">
                            {book.description}
                        </p>
                    </div>
                </div>

                <div className="nav-c flex-col mt-5 ml-8">
                    {/* Author */}
                    <AuthorContainer book={book} onAuthorClick={onAuthorClick}/>
                    <div className="flex-grow hidden sm:block"></div>
                    {/* Parts */}
                    <TabDefault/>
                </div>

            </div>
        </>
    );
}

export default BookDetail;
