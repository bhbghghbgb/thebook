import { Typography } from "@material-tailwind/react";
import { Book } from "../../models/Book";

interface Props {
  bookList: Book[];
}

const BookList = ({ bookList }: Props) => {
  return (
    <>
      {bookList.map((book: Book) => {
        <div className="grid gap-2 grid-areas-product-list grid-cols-[84px auto 1fr auto auto]">
          <div className="manga-card dense">
            <Typography className="font-bold title grid-in-title" variant="h6">
              {book.title}
            </Typography>
            <Typography className="author grid-in-author" variant="small">
              {book.authors.map((author) => author.name).join(", ")}
            </Typography>
            <img
              className="cover grid-in-cover"
              src={book.cover_image}
              alt={book.title}
            />
            
          </div>
        </div>;
      })}
    </>
  );
};

export default BookList;
