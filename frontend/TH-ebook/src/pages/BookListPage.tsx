import {HiArrowLeft} from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@material-tailwind/react";
import LayoutComponent from "../components/Share/LayoutComponent";
import {Book} from "../models/Book";
import withFetchRedux from "../components/hoc/withFetchRedux.tsx";

interface Props {
    header: string;
    data: Book[];
}

const BookListPage = ({header, data}: Props) => {
    const navigate = useNavigate();

    const handleBookClick = (bookId: string) => {
        navigate(`/book/${bookId}`);
    };

    const handleBackClick = () => {
        navigate(-1);
    };


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

const EnhancedBookListPage = ({ header }: Props) => {
    const WrappedComponent = withFetchRedux<Props, Book[]>(
        BookListPage,
    );

    return <WrappedComponent header={header} />;
};
export default EnhancedBookListPage;
