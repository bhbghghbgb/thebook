import { Book } from "../models/Book.ts";
import BookDetail from "../components/BookDetail/BookDetail.tsx";
import { useParams } from "react-router-dom";
import LayoutComponent from "../components/Share/LayoutComponent.tsx";
import withFetchData from "../components/hoc/withFetchData.tsx";
// import {useLocation} from "react-router-dom";

interface Props {
  isMobile: boolean;
  data: Book;
  isLoading: boolean;
  error: Error | null;
}

const BookDetailPage = ({ isMobile, data, isLoading, error }: Props) => {

  return (
    <>
      <LayoutComponent isMobile={isMobile}>
          {isLoading && <div className="text-2xl">Loading...</div>}
            {error && <div className="text-red-900">Error: {error.message}</div>}
        <div className="place-items-center">
          <BookDetail book={data} isMobile={isMobile} />
        </div>
      </LayoutComponent>
    </>
  );
};

const BookDetailPageWithParams: React.FC<Omit<Props, 'data' | 'isLoading' | 'error'>> = ({ isMobile }) => {
    const { id } = useParams<{ id: string }>() as { id: string };
    const WrappedComponent = withFetchData<Props>(
      BookDetailPage,
      `/books/${id}`,
      ['book', id]
    );
  
    return <WrappedComponent isMobile={isMobile} />;
  };
  
  export default BookDetailPageWithParams;
