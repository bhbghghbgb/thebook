import { HiArrowLeft } from "react-icons/hi";
import BookList from "../components/BookList/BookList";

interface Props {
  bookList: Book[];
  header: string;
}

const BookListPage = ({ bookList, header }: Props) => {
  return (
    <>
      <div className="page-container wide">
        <div className="flex items-center mb-6 mt-2">
          <HiArrowLeft className="text-2xl mr-2" />
          <h1 className="text-2xl font-bold">{header}</h1>
        </div>
        <BookList bookList={bookList} />
      </div>
    </>
  );
};

export default BookListPage;

