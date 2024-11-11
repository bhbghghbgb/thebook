import {HiArrowLeft} from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@material-tailwind/react";
import LayoutComponent from "../components/Share/LayoutComponent";
import withFetchData from "../components/hoc/withFetchData";
import {Book} from "../models/Book";

interface Props {
    header: string;
    data: Book[];
    isLoading: boolean;
    error: Error | null;
}

const BookListPage = ({header, data, isLoading, error}: Props) => {
    const navigate = useNavigate();

    const handleBookClick = (bookId: string) => {
        navigate(`/book/${bookId}`);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <LayoutComponent isMobile={false}>
            <div className="page-container p-6">
                <div className="flex items-center mb-6 mt-2">
                    <IconButton onClick={handleBackClick} placeholder={undefined}
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <HiArrowLeft className="text-2xl"/>
                    </IconButton>
                    <h1 className="text-2xl font-bold">{header}</h1>
                </div>
                <BookListContainer books={data} onClick={handleBookClick}/>
            </div>
        </LayoutComponent>
    );
};

const EnhancedBookListPage = withFetchData<Props, Book[]>(
    BookListPage,
    '/books',
    'books'
);

export default EnhancedBookListPage;
