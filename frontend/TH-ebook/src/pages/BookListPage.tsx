import {HiArrowLeft} from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import {useNavigate, useParams} from "react-router-dom";
import {IconButton} from "@material-tailwind/react";

import {useCallback} from "react";
import {StateType} from "../store/rootReducer.ts";
import {useSelector} from "react-redux";

interface Props {
    header: string;
    // data: Book[];
}

const BookListPage = ({header}: Props) => {
    const navigate = useNavigate();

    // dùng useCallBack để tránh việc tạo ra các hàm mới mỗi khi render
    const handleBookClick = useCallback(
        (bookId: string) => {
            navigate(`/book/${bookId}`);
        },
        [navigate]
    );

    const handleBackClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const {type} = useParams<{ type: string }>() as { type: string };


    // Mapping type to actions and selectors
    const bookActions = {
        'New': {
            selector: (state: StateType) => state.newBooks
        },
        'Trending': {
            selector: (state: StateType) => state.trendingBooks
        },
        'Featured': {
            selector: (state: StateType) => state.featuredBooks
        }
    };

    // Get the appropriate action and selector based on type
    const bookConfig = bookActions[type as keyof typeof bookActions];

    // Select books from redux store
    const {data: books, errors, isLoading} = useSelector(bookConfig.selector);

    // If invalid type, redirect to home
    if (!bookConfig) {
        navigate('/');
        return null;

    }


    return (
        <div className="page-container p-6">
            <div className="flex items-center mb-6 mt-2">
                <IconButton
                    onClick={handleBackClick}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <HiArrowLeft className="text-2xl"/>
                </IconButton>
                <h1 className="text-2xl font-bold">{header}</h1>
            </div>
            <BookListContainer
                onClick={handleBookClick}
                books={books || []}
                errors={errors}
                isLoading={isLoading}
            />
        </div>
    );
};

export default BookListPage;
