import { HiArrowLeft } from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import { Book } from "../models/Book";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import LayoutComponent from "../components/Share/LayoutComponent.tsx";
import withFetchBook from "../components/Share/withFetchBook.tsx";

interface Props {
  header: string;
  books: Book[];
}

const BookListPage = ({ header, books }: Props) => {
  const navigate = useNavigate();
  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <LayoutComponent isMobile={false}>
        <div className="page-container p-6">
          <div className="flex items-center mb-6 mt-2">
            <IconButton onClick={handleBackClick}>
              <HiArrowLeft className="text-2xl" />
            </IconButton>
            <h1 className="text-2xl font-bold">{header}</h1>
          </div>
          <BookListContainer books={books} onClick={handleBookClick} />
        </div>
      </LayoutComponent>
    </>
  );
};

export default withFetchBook(BookListPage);
