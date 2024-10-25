import {Book} from "../../models/Book.ts";

interface Props {
    book: Book;
}

const TitleContainer = ({book}: Props) => {
    return (
        <>
            <div className="title space-y-1">
              <span className=" text-custom-xl font-bold block">
                {book.title}
              </span>
                <span className="text-xl block">
                Cross Method in the Dead of Night
              </span>

                <div className="flex-grow hidden sm:block">

                </div>

                <span className="block mt-3 text-2xl">
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