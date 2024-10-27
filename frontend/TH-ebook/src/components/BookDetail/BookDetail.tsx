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
                        onAuthorClick,
                    }: BookDetailProps) => {
    return (
        <>
            {/* Container */}
            <div className="
            container grid px-4
            md:grid-areas-product-detail-mobile md:grid-cols-[200px_auto]
            grid-areas-product-detail grid-cols-[1fr_200px_minmax(0,calc(1240px-3.5rem))_1fr]
            w-full h-full m-0 p-0
             ">
                <div className="nav-l grid-in-cover mr-5">
                    <img
                        src={book.cover_image}
                        alt=""
                        className="w-52 h-80 object-cover"
                    />
                </div>
                {/*Tile*/}
                <div className="grid-in-title">
                    <TitleContainer book={book}/>
                </div>

                {/*ButtonGroup*/}
                <div className="grid-in-buttons sm:ml-2 relative">
                    <ButtonGroupContainer
                        onAddToLibrary={onAddToLibrary}
                        onPreview={onPreview}
                        onPreoder={onPreoder}
                        onSub={onSub}
                    />
                </div>

                {/* category */}
                <div className="grid-in-info sm:mx-2">
                    <CategoryContainer book={book} onCategoryClick={onCategoryClick}/>
                </div>


                {/* rating */}
                <div className="grid-in-stats sm:mx-2 mt-auto sm:mt-0">
                    <RatingsContainer/>
                </div>

                {/* description */}
                <div className="grid-in-synopsis min-w-0">
                    <p className="story-description">{book.description}</p>
                </div>

                <div className="content flex gap-6 items-start grid-in-content">
                    {/* Author */}
                    <AuthorContainer book={book} onAuthorClick={onAuthorClick}/>
                    {/* Parts */}
                    <TabDefault/>
                </div>
            </div>


        </>
    );
};

export default BookDetail;


/* 

Thuộc tính này định nghĩa một lưới với 4 cột:

Cột đầu tiên chiếm một phần của không gian còn lại.
Cột thứ hai có chiều rộng cố định là 200 pixel.
Cột thứ ba có chiều rộng tối thiểu là 0 và tối đa là 1240px - 56px (3.5rem đổi ra pixel).
Cột thứ tư chiếm một phần của không gian còn lại.

*/
