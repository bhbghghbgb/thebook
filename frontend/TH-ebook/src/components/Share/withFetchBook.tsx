import React from 'react';
import { useFetchBooks, useFetchBook } from '../../hooks/useFetchBook.ts';
interface WithFetchBookProps {
    bookId?: string;
}

/*
*
* Kiểu P cho phép truyền vào một component với một props bất kỳ
* Với kiểu P ta có thể tao ra một component mới mà không cần biết props của component đó là gì
* Và vẫn giữ nguyên được props của component truyền vào
*
* */

const withFetchBook = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P & WithFetchBookProps) => { // Trả về component mới với props là kết hợp giữa kiểu P và WithFetchBookProps có thể chứa bookId
        const { bookId } = props;
        const { data: books, error: booksError, isLoading: booksLoading } = useFetchBooks();
        const { data: book, error: bookError, isLoading: bookLoading } = useFetchBook(bookId || '');

        if (bookId) {
            if (bookLoading) return <div>Loading...</div>;
            if (bookError) return <div>Error loading book</div>;
            return <Component {...(props as P)} book={book} />;
        } else {
            if (booksLoading) return <div>Loading...</div>;
            if (booksError) return <div>Error loading books</div>;
            return <Component {...(props as P)} books={books} />;
        }
    };
};

export default withFetchBook;