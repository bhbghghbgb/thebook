import { HiArrowLeft } from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import { Book } from "../models/Book";
import { useNavigate } from "react-router-dom";
import {IconButton} from "@material-tailwind/react";

interface Props {
  bookList: Book[];
  header: string;
}

const BookListPage = ({ bookList, header }: Props) => {
  const navigate = useNavigate();
  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="page-container p-6">
        <div className="flex items-center mb-6 mt-2">
          <IconButton onClick={handleBackClick}>
            <HiArrowLeft className="text-2xl" />
          </IconButton>
          <h1 className="text-2xl font-bold">{header}</h1>
        </div>
        <BookListContainer books={bookList} onClick={handleBookClick} />
      </div>
    </>
  );
};

export default BookListPage;
