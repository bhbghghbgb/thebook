import LoadingSpinner from "../_Common/LoadingSpinner.tsx";
import BookListComponent from "./BookListComponent.tsx";
import {Book} from "../../models/Book.ts";

interface Props {
    books: Book[];
    errors: string;
    isLoading: boolean;
    onClick: (bookId: string) => void;
}

const BookListContainer = ({onClick, books, isLoading, errors}: Props) => {


    if (isLoading) {
        return <LoadingSpinner isLoading={isLoading}/>;
    }
    if (errors) {
        return <div className="text-2xl text-red-900">Error loading data</div>;
    }

    return books?.map((book) => <BookListComponent book={book}/>);
};

export default BookListContainer;
