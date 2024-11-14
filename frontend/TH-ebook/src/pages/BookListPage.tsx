import { HiArrowLeft } from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import LayoutComponent from "../components/Share/LayoutComponent";
// import { Book } from "../models/Book";
// import withFetchRedux from "../components/hoc/withFetchRedux";
import /*React, */{useCallback} from "react";
import useBooksRedux from "../hooks/useBooksRedux.ts";
// import {getBooksAction} from "../features/book/bookSlice.ts";
// import {useDispatch, useSelector} from "react-redux";
// import {StateType} from "../store/rootReducer.ts";

interface Props {
    header: string;
    // data: Book[];
}

const BookListPage = ({ header }: Props) => {
    const navigate = useNavigate();

    // dùng useCallBack để tránh việc tạo ra các hàm mới mỗi khi render
    const handleBookClick = useCallback((bookId: string) => {
        navigate(`/book/${bookId}`);
    }, [navigate]);

    const handleBackClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     console.log('Component mounted');
    //     console.log('Action type:', getBooksAction.type);
    //     const action = getBooksAction();
    //     console.log('Dispatching action:', action);
    //     dispatch(action);
    // }, []); // Chỉ chạy một lần khi component được render
    //
    // const { data, errors, isLoading } = useSelector(
    //     (state: StateType) => state.books
    // );
    //
    // if (isLoading) {
    //     return <div className="text-2xl">Loading...</div>;
    // }
    //
    // if (errors) {
    //     return <div className="text-2xl text-red-900">Error loading data</div>;
    // }
    const { books, errors, isLoading } = useBooksRedux();
    return (
        <LayoutComponent isMobile={false}>
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
                <BookListContainer onClick={handleBookClick} books={books}  errors={errors} isLoading={isLoading}/>
            </div>
        </LayoutComponent>
    );
};

// // Đơn giản hóa cách sử dụng HOC
// const EnhancedBookListPage = withFetchRedux<Props, Book[]>(BookListPage);
//
// // Export component đã được wrap
// export default function BookListPageContainer({ header }: Omit<Props, 'data'>) {
//     return <EnhancedBookListPage key={header} header={header} />;
// }

export default BookListPage;