import {Book} from "../../models/Book.ts";

interface Props {
    book: Book;
}

const TitleContainer = ({book}: Props) => {
    return (
        <>
            <div className="title ">
              <span className=" text-custom-xl font-bold block mb-1">
                {book.title}
              </span>
                <div className="flex-grow hidden sm:block"></div>
                <span className="text-xl block">
                Cross Method in the Dead of Night
              </span>

                <span className="block font-normal text-xs sm:text-base sm:truncate flex-shrink-0">
                {book.authors.map(author => author.name).join(", ")}
              </span>
                <span className=" text-sm font-bold">
            Publication: {book.published_year}
          </span>
            </div>
        </>
    )
}

export default TitleContainer;